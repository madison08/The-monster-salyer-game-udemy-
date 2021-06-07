
function getRandomVlaue(min, max){
    return Math.floor(Math.random() * (max - min)) + min; // Generer valeur aleatoire entre un min et un max
}

const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },

    computed: {
        monsterbarStyle(){
            if(this.monsterHealth < 0){ //Determiner en pourcentage la vie sur 100%
                return { width: '0%' }
            }
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyle(){
            if(this.playerHealth < 0){
                return { width: '0%' }
            }
            return { width: this.playerHealth + '%' }
        },
        mayUseSpecialAttack(){ // Forcer l'utilisateur a faire des attaque special seulement apres 3 action  
            return this.currentRound % 3 !== 0;
        }
    },

    watch: {
        playerHealth(value){  //Observer la vie du joueur 

            if(value <= 0 && this.monsterHealth <= 0){
                // match null
                this.winner = 'Null'



            }else if(value <= 0){
                //player lost
                this.winner = 'Monster'
            }

        },
        monsterHealth(value){ //Observer la vie du monstre
            if( value <= 0 && this.playerHealth <= 0){
                // match null
                this.winner = 'Null'



            }else if(value <= 0){
                // Monster lost
                this.winner = 'Player'

            }
        }

    },

    methods: {

        startNewGame(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.currentRound = 0
            this.winner = null,
            this.logMessages = []
        },

        attackMonster(){


            this.currentRound++

            const attackValue =  getRandomVlaue(5, 12)

            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();

            this.addLogMessage('Player', 'Attack', attackValue)

            if(this.monsterHealth < 0){
                //Joueur perdu



            }

        },

        attackPlayer(){
            const attackValue =  getRandomVlaue(8, 15)

            this.playerHealth = this.playerHealth - attackValue;

            this.addLogMessage('Monster', 'Attack', attackValue)
        },

        specialAttackMonster(){
            this.currentRound++
            const attackValue = getRandomVlaue(10, 25)
            this.monsterHealth = this.monsterHealth - attackValue;

            this.attackPlayer()

            this.addLogMessage('Player', 'Attack', attackValue)
        },

        healPlayer(){
            this.currentRound++
            const healValue = getRandomVlaue(8, 20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100

            }else{
                this.playerHealth = this.playerHealth + healValue
            }

            this.addLogMessage('Player', 'Heal', healValue)
        },

        surrender(){
            this.healPlayer = 0
            this.winner = 'Monster'

            this.playerBarStyle()
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
});

app.mount('#game')

