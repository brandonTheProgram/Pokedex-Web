import json

region = "Galar"
indent = "    "
doubleIndent = 2 * indent
tripleIndent = 3 * indent
quadIndent = 4 * indent
quintIndent = 5 * indent
sexIndent = 6 * indent
outputFile = "Output/{}.json".format(region)
inputJson = "Input/{}.json".format(region)
gen7File = "Input/{} Gen 7 Attack.txt".format(region)
gen8File = "Input/{} Gen 8 Attack.txt".format(region)
bdspFile = "Input/{} BDSP Attack.txt".format(region)
lgplgeFile = "Input/{} LGPLGE Attack.txt".format(region)
targetPokemon = ""
basic_keys_to_extract = ["pokedexNumber", "name", "image", "species", "priType", "secType", "description", "abilities", "ability", "abilityDesc", "hiddenAbility", "hiddenAbilityDesc", "altAbility", "altAbilityDesc", "hasAlolanForm", "hasGalarianForm"]
evolutions_keys_to_extract = ["evolutions", "isSecondEvo", "isFinalEvo", "hasBranchEvo", "evoThroughLvl", "evoThroughCond", "evoLevel", "secondEvoCond", "finalEvoCond", "firstEvoNum", "secondEvoNum", "finalEvoNum", "branchEvoNum"]
location_keys_to_extract = ["gameOneLocation", "gameTwoLocation", "gameThreeLocation", "gameFourLocation", "gameFiveLocation", "gameSixLocation", "gameSevenLocation", "gameEightLocation", "gameNineLocation", "gameTenLocation"]

games = ["Sun", "Moon", "Ultra Sun", "Ultra Moon", "Let's Go Pikachu", "Let's Go Eevee", "Sword", "Shield", "Brilliant Diamond", "Shining Pearl"]
dualGames = ["Sun/Moon/Ultra Moon/Ultra Sun", "Let's Go Pikachu/Eevee", "Sword/Shield", "Brilliant Diamond/Shining Pearl"]

def returnKeyValue(key, value, padding):
    if type(value) is str:
        return(padding + "\"" + key + "\": \"" + str(value) + "\",")
    else:
        return(padding + "\"" + key + "\": " + str(value) + ",")

def printBasic(dictItems, textfile):
    #print basic attributes
    print(indent + "\"basic\":", file=textfile)
    print(indent +"{", file=textfile)
    for key in basic_keys_to_extract:
        if key == "name":
            global targetPokemon
            targetPokemon = dictItems[key]
        if key == basic_keys_to_extract[-1]:
            print(returnKeyValue(key, dictItems[key], doubleIndent)[:-1], file=textfile)
        else:
            print(returnKeyValue(key, dictItems[key], doubleIndent), file=textfile)
    print(indent +"},", file=textfile)

def printEvolutions(dictItems, textfile):
    #print evolution attributes
    print(indent + "\"evolutions\":", file=textfile)
    print(indent +"{", file=textfile)
    for key in evolutions_keys_to_extract:
        if key == evolutions_keys_to_extract[-1]:
            print(returnKeyValue(key, dictItems[key], doubleIndent)[:-1], file=textfile)
        else:
            print(returnKeyValue(key, dictItems[key], doubleIndent), file=textfile)
    print(indent +"},", file=textfile)

def printLocations(dictItems, textfile):
    index = 0
    #print location attributes
    print(indent + "\"locations\":", file=textfile)
    print(indent + "[", file=textfile)
    for key in location_keys_to_extract:
        location = dictItems[key]
        print(doubleIndent + "{", file=textfile)

        if location == "None":
            print(tripleIndent + "\"isAvailable\": 0,", file=textfile)
        else:
            print(tripleIndent + "\"isAvailable\": 1,", file=textfile)
        print(returnKeyValue("game", games[index], tripleIndent), file=textfile)
        print(returnKeyValue("location", location, tripleIndent)[:-1], file=textfile)

        if key == location_keys_to_extract[-1]:
            print(doubleIndent + "}", file=textfile)
        else:
            print(doubleIndent + "},", file=textfile)

        index += 1


    print(indent + "],", file=textfile)

def printAttack(attackList, target, textfile):
    found = False
    skipOnce = False
    numOfMoves = 0
    count = 1

    for line in attackList:
        # remove newline from line
        if line != "\n":
            line = line.strip()

        if line != target and not found:
            continue
        elif line == target:
            found = True
        elif found == True and not skipOnce:
            skipOnce = True
            numOfMoves = int(line)
        elif skipOnce == True and line != '\n' and numOfMoves > 0:
            splitLine = line.split(' ', 1) # split the level and move
            attack = splitLine[1]
            level = splitLine[0]
            print(quadIndent + "{", file=textfile)
            print(quintIndent + "\"name\": \"" + attack + "\",", file=textfile)
            print(quintIndent + "\"level\": " + level, file=textfile)
            if count < numOfMoves:
                print(quadIndent + "},", file=textfile)
                count += 1
            else:
                print(quadIndent + "}", file=textfile)
        else:
            break

def printMoves(textfile, target):
    file1 = open(gen7File, 'r')
    gen7Moves = file1.readlines()
    file1.close()
    file2 = open(lgplgeFile, 'r')
    lgplgeMoves = file2.readlines()
    file2.close()
    file3 = open(gen8File, 'r')
    gen8Moves = file3.readlines()
    file3.close()
    file4 = open(bdspFile, 'r')
    bdspMoves = file4.readlines()
    file4.close()

    #print moves attributes
    print(indent + "\"moveset\":", file=textfile)
    print(indent + "[", file=textfile)

    for game in dualGames:
        print(doubleIndent + "{", file=textfile)

        print(returnKeyValue("game", game, tripleIndent), file=textfile)
        print(tripleIndent + "\"moves\":", file=textfile)
        print(tripleIndent + "[", file=textfile)

        if game == dualGames[0]: #if the game is SMUSUM
            printAttack(gen7Moves, target, textfile)
        elif game == dualGames[1]: #if the game is LGPLGE
            printAttack(lgplgeMoves, target, textfile)
        elif game == dualGames[2]: #if the game is SWSH
            printAttack(gen8Moves, target, textfile)
        else: #if the game is BDSP
            printAttack(bdspMoves, target, textfile)
        
        print(tripleIndent + "]", file=textfile)

        if game == dualGames[-1]:
            print(doubleIndent + "}", file=textfile)
        else:
            print(doubleIndent + "},", file=textfile)

    print(indent + "]", file=textfile)

# read file
with open(inputJson, encoding="utf8") as myfile:
    Pokemondata=myfile.read()

# parse file
Pokemons = json.loads(Pokemondata)

# Print the final Results
textfile = open(outputFile, "w")

print("[", file=textfile)

for pokemon in Pokemons:
    keys = pokemon.keys()
    values = pokemon.values()
    dictItems = dict(zip(keys,values))

    #Open Results
    print('{', file=textfile)

    printBasic(dictItems, textfile)
    printEvolutions(dictItems, textfile)
    printLocations(dictItems, textfile)
    printMoves(textfile, targetPokemon)

    #Close Results
    if pokemon != Pokemons[-1]:
        print('},', file=textfile)
    else:
        print('}', file=textfile)

print("]", file=textfile)

textfile.close()
