function getRandom(min, max){
    const aValue = Math.floor(Math.random() * (max-min)) + min;
    console.log('Value: ' + aValue)
    return aValue;
}


const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0){
                // draw
                this.winner = 'draw';
            } else if (value <= 0){
                // player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0){
                // draw
                this.winner = 'draw';
            } else if (value <= 0){
                // monster lost
                this.winner = 'player';
            }
        }
    },
    methods: {
        startGame(){
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.currentRound = 0,
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandom(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('player', 'attack', attackValue);
            console.log('Player:  ' + this.playerHealth);
            console.log('Monster:  ' + this.monsterHealth);
        },
        attackPlayer() { 
            const attackValue =  getRandom(8, 15);
            this.playerHealth -= attackValue;
            if(this.playerHealth - attackValue < 0){
                this.playerHealth = 0;
            }else {
            this.playerHealth -= attackValue;
            }
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandom(30, 35);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('player', 'special attack', attackValue);
            console.log('Player:  ' + this.playerHealth);
            console.log('Monster:  ' + this.monsterHealth);
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandom(15, 25);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%'};
        },
        playerBarStyles() {
            return { width: this.playerHealth + '%'};
        }
    }
});

app.mount('#game');