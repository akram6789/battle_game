body {
    background: #222;
    color: #fafafa;
    font-family: 'Segoe UI', 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
}

.container {
    max-width: 600px;
    margin: 2rem auto 0 auto;
    background: #282c34d9;
    border-radius: 10px;
    box-shadow: 0 2px 16px #0006;
    padding: 2.5rem;
    border: 1px solid #222;
}

header {
    margin-bottom: 0.7em;
}

footer {
    margin-top: 2.5em;
    font-size: 0.85em;
    text-align: center;
    color: #aaa;
}

h1 {
    font-size: 2.2rem;
    margin: 0.2em 0 0.4em 0;
    letter-spacing: 0.02em;
}

.name-form, .combat-controls, .reset-form {
    margin: 1.2em 0;
    display: flex;
    align-items: center;
    gap: 1em;
}

.name-form label,
.combat-controls label {
    font-size: 1rem;
    color: #d8d8f0;
}

input[type="text"], select {
    padding: 0.4em 0.6em;
    border-radius: 6px;
    border: 1px solid #666;
    margin-left: 0.2em;
    font-size: 1em;
}

input[type="text"]:focus, select:focus {
    outline: 2px solid #26f;
}

button {
    background: linear-gradient(90deg, #26a, #35d);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    padding: 0.5em 1.2em;
    cursor: pointer;
    transition: box-shadow 0.2s;
    box-shadow: 0 1px 4px #134a6c25;
    margin-left: 0.2em;
}

button:hover {
    background: linear-gradient(90deg, #34d, #46f);
}

.stats-bar {
    margin-top: 1.3em;
    margin-bottom: 1.5em;
}

.bar-label {
    font-size: 0.96em;
    margin: 0.3em 0 0.08em 0.6em;
    color: #aac;
}

.bar {
    background: #181d22;
    border-radius: 7px;
    margin-bottom: 0.5em;
    height: 26px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 6px #0002;
}

.bar .fill {
    display: flex;
    align-items: center;
    padding-left: 0.6em;
    font-weight: bold;
    font-size: 1em;
    height: 100%;
    color: #fff;
    transition: width 0.25s;
}

.health-bar .fill {
    background: linear-gradient(90deg, #3cf98c 20%, #25b772);
}

.stamina-bar .fill {
    background: linear-gradient(90deg, #58d1fc, #245fbe);
}

.enemy-bar .fill.boss {
    background: linear-gradient(90deg, #f56666, #a70000 90%);
}

.combat-log {
    margin: 1.75em 0 0 0;
    padding: 0;
}

.combat-log h2 {
    font-size: 1.2em;
    margin-bottom: 0.4em;
    color: #ffe6c0;
    text-shadow: 1px 2px 0 #201, 0 1px 0 #9122;
}

.combat-log ul {
    background: #232a30;
    border-radius: 7px;
    list-style: none;
    padding: 1em 1.2em;
    max-height: 210px;
    min-height: 120px;
    overflow-y: auto;
    font-size: 1.06em;
}

.combat-log li {
    margin-bottom: 0.6em;
    padding-left: 0.15em;
    line-height: 1.38em;
    border-left: 5px solid transparent;
    border-radius: 3px;
}

.log-info {
    color: #eee;
    border-color: #4ac;
    background: #28507430;
}
.log-error {
    color: #efe7e7;
    border-color: #e53;
    background: #ff000012;
    font-weight: 600;
}
.log-buff {
    color: #f7faab;
    border-color: #ff8000;
    background: #7d640028;
    font-weight: 500;
}
.log-critical {
    color: #ffc0cb;
    border-color: #fd3bc0;
    background: #ed5ca147;
    font-weight: 700;
    letter-spacing: .2px;
}

.flash-error, .flash-danger {
    color: #ffe6e6;
    background: #be21255e;
    border-left: 6px solid #e1151a;
    border-radius: 5px;
    padding: 0.5em 1.2em;
    margin: 1em 0 0 0;
}

.flash-info {
    color: #eaf4fb;
    background: #217abe40;
    border-left: 6px solid #228be1;
    border-radius: 5px;
    padding: 0.5em 1.2em;
    margin: 1em 0 0 0;
}

.flash-success {
    color: #e2ffe6;
    background: #21be5e45;
    border-left: 6px solid #12e167;
    border-radius: 5px;
    padding: 0.5em 1.2em;
    margin: 1em 0 0 0;
}

.player-info span {
    display: inline-block;
    background: #213155ba;
    border-radius: 5px;
    padding: 0.25em 0.6em;
    margin-right: 0.7em;
    font-size: 1.01em;
}

.game-over-message {
    background: #0008;
    color: #ffbbbb;
    text-align: center;
    font-size: 1.4em;
    border-radius: 7px;
    padding: 1.6em 1em 1em 1em;
    margin-top: 1.3em;
    box-shadow: 0 2px 8px #9004;
}