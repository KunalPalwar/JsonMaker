function GenerateRandomString(charLength){

    let result = "";
    for(let index = 0;index<charLength;index++){
          let charCode = Math.floor(Math.random() * 25 + 65)
       let asciiChar = String.fromCharCode(charCode)
       result = result.concat(asciiChar)
    }
    return result
   
   }

   function GetData(key,type){
    var res = undefined;
    switch(type){
        case "string":
            res = GenerateRandomString(5)
            break
        case "number":
            res = Math.floor(Math.random()*10)
            break
        case "boolean":
            res = Math.floor(Math.random()*2) == 1?true:false
            break
        default:
            console.log("Invalid Type")
            break

    }
    return res
   }
   
   
   
   function FillArrayWithString(key,length){
       let stringArray = []
     for(let index=0;index<length;index++){
         let data = GenerateRandomString(5)
       stringArray.push(data)
     }
     return stringArray
   
   }
   
   function FillArrayWithNumber(key,length){
       let numberArray = []
     for(let index=0;index<length;index++){
         let number = Math.floor(Math.random()*10)
       numberArray.push(number)
     }
     return numberArray
   }
   
   function FillArrayWithBoolean(key,length){
        let booleanArray = []
        for(let index=0;index<length;index++){
              let zeroOrOne = Math.floor(Math.random()*2)
         let value = zeroOrOne == 0? false:true
         booleanArray.push(value)
      }
      return booleanArray
   }
   
   
   
   
   function GetType(value){
      if(value == undefined) return 'empty'
      return Array.isArray(value) ? 'array':
              value == null ? 'null':
              typeof(value)
   }
   
   function PopulateData(jsonStructure){
   
       if(!jsonStructure) return
     
     let result = {}
     let keys = Object.keys(jsonStructure)
     
     for(let index = 0;index<keys.length;index++){
         let key = keys[index]
       let type = GetType(jsonStructure[key])
                
           switch(type){
       
       case 'array':
         let arrayWithValue = []
           let firstElement = GetType(jsonStructure[key][0])
                             
         if(firstElement == 'empty') result[key] = arrayWithValue
         else if(firstElement == 'object'){
           let nestedArray = []
             for(let j=0;j<jsonStructure[key].length;j++){
               nestedArray.push(PopulateData(jsonStructure[key][j]))
           }
           result[key] = nestedArray
         }
         else{
          if(firstElement == 'string'){
            let arrayWithString = FillArrayWithString(key,jsonStructure[key].length)
            result[key] = arrayWithString
          }
          else if(firstElement == 'number'){
           let arrayWithNumber = FillArrayWithNumber(key,jsonStructure[key].length)
           result[key] = arrayWithNumber
          
          }
          else{
           let arrayWithBoolean = FillArrayWithBoolean(key,jsonStructure[key].length)
           result[key] = arrayWithBoolean
          }
         }
         
       break
       case 'object':
           result[key] = PopulateData(jsonStructure[key])
       break
       
       case 'string':
           result[key] = GetData(key,type)
       break
       case 'number':
           result[key] = GetData(key,type)
       break
       case 'boolean':
           result[key] = GetData(key,type)
       break
       case 'null':
           result[key] = null
       break
       default:
           console.log("No type matched")
       break
       
       
       }
       
       
       
     }
     return result
   }
   
   function ReplicateJsonWithData(jsonStructure,replicationCount){
   
       if(!jsonStructure) return
     
     let result = []
     for(let index = 0;index<replicationCount;index++){
         let finalResult = PopulateData(jsonStructure)
       result.push(finalResult)
     }
     return result
   
   }
   
   var json = {
    pieceName: "Emo Flamingos",
    price: 30,
    ownerList: [
      {
        name: "Fida Ernest",
        userID: 23849,
        purchaseDate: "09/13/2021",
      },
      {
        name: "Eric Karger",
        userID: 23510,
        purchaseDate: "09/13/2021",
      },
    ],
  }
   var res = ReplicateJsonWithData(json,5)
   console.log(JSON.stringify(res))
   