from flask import Flask, render_template, request, session


import time
import random
from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Moves dictionary
moves = {
    "punch": {"damage": 5, "emoji": "👊", "stamina_cost": 2},
    "kick": {"damage": 10, "emoji": "🦵", "stamina_cost": 4},
    "dash": {"damage": 8, "emoji": "💨", "stamina_cost": 3},
    "block": {"damage": 0, "emoji": "🛡️", "stamina_cost": 0},
    "meteor strike": {"damage": 50, "emoji": "☄️", "stamina_cost": 10}
}

required_scores = {
    "punch": 0,
    "kick": 5,
    "dash": 10,
    "block": 15,
    "meteor strike": 20
}

# Skill tree perks
perks = {
    "critical_hit": {"chance": 0.1, "multiplier": 2},
    "combo_bonus": {"sequence": ["punch", "kick", "dash"], "bonus": 5},
    "perfect_block": {"reflect": 0.5},
    "shield_buff": {"block_chain": 3, "armor_bonus": 5},
    "loot_drop": {"chance": 0.2},
    "daily_buff": {"damage_boost": 0.1}
}

def init_game():
    session['score'] = 0
    session['enemy_health'] = 70000
    session['max_enemy_health'] = 70000
    session['player_health'] = 100
    session['max_player_health'] = 100
    session['stamina'] = 20
    session['max_stamina'] = 20
    session['level'] = 1
    session['xp'] = 0
    session['inventory'] = []
    session['name'] = None
    session['combat_log'] = []
    session['game_over'] = False
    session['move_cooldowns'] = {}
    session['meteor_strike_count'] = 0
    session['player_turn'] = True
    session['in_combat'] = False
    session['combo_chain'] = []
    session['block_chain'] = 0
    session['daily_buff'] = True

def add_to_log(message, log_type='info'):
    if 'combat_log' not in session:
        session['combat_log'] = []
    log = session['combat_log']
    log.insert(0, {'message': message, 'type': log_type})
    session['combat_log'] = log[:10]
    session.modified = True

def calculate_damage(move):
    damage = moves[move]["damage"]

    # Critical hit perk
    if random.random() < perks["critical_hit"]["chance"]:
        damage *= perks["critical_hit"]["multiplier"]
        add_to_log(f"🔥 Critical Hit! {move} dealt {damage} damage!", "critical")

    # Combo chain perk
    session['combo_chain'].append(move)
    if session['combo_chain'][-3:] == perks["combo_bonus"]["sequence"]:
        damage += perks["combo_bonus"]["bonus"]
        add_to_log("⚡ Combo Bonus! Extra damage added!", "buff")

    # Daily buff perk
    if session.get('daily_buff'):
        damage = int(damage * (1 + perks["daily_buff"]["damage_boost"]))

    return damage

def apply_block(enemy_attack):
    # Perfect block perk
    if random.random() < 0.2:  # 20% chance
        reflected = int(enemy_attack * perks["perfect_block"]["reflect"])
        session['enemy_health'] -= reflected
        add_to_log(f"🛡️ Perfect Block! Reflected {reflected} damage!", "buff")

    # Shield buff perk
    session['block_chain'] += 1
    if session['block_chain'] >= perks["shield_buff"]["block_chain"]:
        session['player_health'] += perks["shield_buff"]["armor_bonus"]
        add_to_log("🛡️ Shield Buff! Temporary armor gained!", "buff")
        session['block_chain'] = 0

def enemy_ai():
    # Boss mechanics: stronger at half health
    if session['enemy_health'] < session['max_enemy_health'] / 2:
        attack = random.choice(["kick", "dash", "meteor strike"])
    else:
        attack = random.choice(list(moves.keys()))
    return attack

def gain_xp(amount):
    session['xp'] += amount
    if session['xp'] >= session['level'] * 10:
        session['level'] += 1
        session['max_player_health'] += 10
        session['player_health'] = session['max_player_health']
        add_to_log(f"🌟 Level Up! You are now level {session['level']}!", "buff")

def loot_drop():
    if random.random() < perks["loot_drop"]["chance"]:
        item = random.choice(["Potion", "Damage Boost", "Stamina Refill"])
        session['inventory'].append(item)
        add_to_log(f"🎁 Loot Drop! You found a {item}!", "buff")

@app.route("/")
def home():
    if 'score' not in session:
        init_game()
    
    if session.get('name') and not session.get('game_over'):
        return redirect(url_for('combat'))
    
    return render_template('home.html')

@app.route("/combat")
def combat():
    if 'score' not in session or not session.get('name'):
        return redirect(url_for('home'))
    
    if session.get('game_over'):
        return redirect(url_for('home'))
    
    return render_template('combat.html', 
                           player_health=session['player_health'],
                           enemy_health=session['enemy_health'],
                           stamina=session['stamina'],
                           inventory=session['inventory'],
                           combat_log=session['combat_log'])

