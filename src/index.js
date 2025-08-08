const prompt = require('prompt-sync')();

async function selectCharacter(){
    console.log("🏁Selecione seu personagem:");
    console.log("1. Mario , 2. Luigi, 3. Peach, 4. Yoshi, 5. Bowser, 6. Donkey Kong");

    let player1chouse = prompt("Digite o número do personagem: ");
    let player2chouse = prompt("Digite o número do personagem do oponente: ");
    
    if(player1chouse === player2chouse){
        console.log("🏁Você não pode escolher o mesmo personagem para os dois jogadores!");
        return selectCharacter();
    }    

    let player1, player2;
    // Criação do player1
    switch(player1chouse){
        case '1':
            player1 = {NOME: "Mario", VELOCODADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0};
            break;
        case '2':
            player1 = {NOME: "Luigi", VELOCODADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0};
            break;
        case '3':
            player1 = {NOME: "Peach", VELOCODADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0};
            break;
        case '4':
            player1 = {NOME: "Yoshi", VELOCODADE: 2, MANOBRABILIDADE: 5, PODER: 3, PONTOS: 0};
            break;
        case '5':
            player1 = {NOME: "Bowser", VELOCODADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0};
            break;
        case '6':
            player1 = {NOME: "Donkey Kong", VELOCODADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0};
            break;
        default:
            console.log("🏁Personagem inválido! Tente novamente.");
            return selectCharacter();
    }

    // Criação do player2
    switch(player2chouse){
        case '1':
            player2 = {NOME: "Mario", VELOCODADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0};
            break;
        case '2':
            player2 = {NOME: "Luigi", VELOCODADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0};
            break;
        case '3':
            player2 = {NOME: "Peach", VELOCODADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0};
            break;
        case '4':
            player2 = {NOME: "Yoshi", VELOCODADE: 2, MANOBRABILIDADE: 5, PODER: 3, PONTOS: 0};
            break;
        case '5':
            player2 = {NOME: "Bowser", VELOCODADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0};
            break;
        case '6':
            player2 = {NOME: "Donkey Kong", VELOCODADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0};
            break;
        default:
            console.log("🏁Personagem inválido! Tente novamente.");
            return selectCharacter();
    }

    return { player1, player2 };
}

async function rollDice(){
    return Math.floor(Math.random()* 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result

    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;

        default:
            result = "CONFRONTO"
            break;
    }
    return result;
}

async function logRollResults(characterName,block,diceResult,attribute){
    console.log(`🎲 ${characterName} rolou um dado de : ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playReceEngine(character1, character2){
    for(let raund = 1; raund <= 5; raund++){
        console.log(`🏁Raund ${raund} - ${character1.NOME} vs ${character2.NOME}`);

    //Sortear Blocos
    let block = await getRandomBlock();
    console.log(`🏁Bloco: ${block}`);

    //Rolar Dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de abilidade
    let TotalTestSkill1 = 0;
    let TotalTestSkill2 = 0;

    if(block === "RETA"){
        TotalTestSkill1 = character1.VELOCODADE + diceResult1;
        TotalTestSkill2 = character2.VELOCODADE + diceResult2;

        await logRollResults(character1.NOME, "Velocidade", diceResult1, character1.VELOCODADE);
        await logRollResults(character2.NOME, "Velocidade", diceResult2, character2.VELOCODADE);
    }
    else if(block === "CURVA"){
        TotalTestSkill1 = character1.MANOBRABILIDADE + diceResult1;
        TotalTestSkill2 = character2.MANOBRABILIDADE + diceResult2;

        await logRollResults(character1.NOME, "Manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
        await logRollResults(character2.NOME, "Manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    }
    else if(block === "CONFRONTO"){
        let pawerResult1 = character1.PODER + diceResult1;
        let pawerResult2 = character2.PODER + diceResult2;

        console.log(`⚔ ${character1.NOME} confrontou com ${character2.NOME}⚔`);

        await logRollResults(character1.NOME, "Poder", diceResult1, character1.PODER);
        await logRollResults(character2.NOME, "Poder", diceResult2, character2.PODER);

        if(pawerResult1 > pawerResult2 && character2.PONTOS > 0){
            character2.PONTOS --;
            console.log(`${character1.NOME} venceu o confronto e ${character2.NOME} perdeu um ponto!🐢`);
        }
        else if(pawerResult2 >pawerResult1 && character1.PONTOS > 0 ){
            console.log(`${character2.NOME} venceu o confronto e ${character1.NOME} perdeu um ponto!🐢`);
            character1.PONTOS --
        }

        console.log(pawerResult2 === pawerResult1 ? "Empate no confronto!" : pawerResult1 > pawerResult2 ? `${character1.NOME} venceu o confronto!` : `${character2.NOME} venceu o confronto!`);
       
        
    }

    if(TotalTestSkill1 > TotalTestSkill2 ){
        console.log(`🏁${character1.NOME} ganhou um ponto!`);
        character1.PONTOS +=1;
    } else if(TotalTestSkill2 > TotalTestSkill1){
        console.log(`🏁${character2.NOME} ganhou um ponto!`);
        character2.PONTOS +=1;
    }

    console.log('_______________________________')
}
}
async function declareWinner(character1, character2){
    console.log(`🏁Resultado Final: ${character1.NOME} - ${character1.PONTOS} pontos, ${character2.NOME} - ${character2.PONTOS} pontos.`);
    if(character1.PONTOS > character2.PONTOS){
        console.log(`🏆 ${character1.NOME} é o grande vencedor com ${character1.PONTOS} pontos!`);
    }
    else if(character2.PONTOS > character1.PONTOS){
        console.log(`🏆 ${character2.NOME} é o grande vencedor com ${character2.PONTOS} pontos!`);
    }else{
        console.log(`🏁 Empate! Ambos os jogadores terminaram com ${character1.PONTOS} pontos.`);
    }
} 

async function main(){
    const { player1, player2 } = await selectCharacter(); 
    const player1Roll = await rollDice();
    const player2Roll = await rollDice();
    console.log(`\n🏁Iniciando a corrida entre ${player1.NOME} e ${player2.NOME}`);
    await playReceEngine(player1, player2);
    await declareWinner(player1, player2);
    console.log("🏁Fim da corrida! Obrigado por jogar!");
}

main();