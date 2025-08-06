const player1 = {
    NOME: "Mario",
    VELOCODADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "luigi",
    VELOCODADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
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

        console.log(`🏁 ${character1.NOME} confrontou com ${character2.NOME}⚔`);

        await logRollResults(character1.NOME, "Poder", diceResult1, character1.PODER);
        await logRollResults(character2.NOME, "Poder", diceResult2, character2.PODER);

        if(pawerResult1 > pawerResult2){
            console.log(`🏁${character1.NOME} venceu o confronto!`);
            character1.PONTOS -= 1;
        }else if(pawerResult2 > pawerResult1){
            console.log(`🏁${character2.NOME} venceu o confronto!`);
            character2.PONTOS -= 1;
        }
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
async function main(){
    const player1Roll = await rollDice();
    const player2Roll = await rollDice();
    console.log(`🏁Iniciando a corrida entre ${player1.NOME} - Rolou: ${player1Roll} e  ${player2.NOME} - Rolou: ${player2Roll}.`);

    await playReceEngine(player1, player2);
}

main()