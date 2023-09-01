import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput, Dimensions } from 'react-native';
import { useState} from 'react';



export default function App() {
  const [Cipher, setCipher] = useState('');
  const [shiftNum, setShiftNum] = useState('');
  const [displayText, setDisplayText] = useState('');
  
  return (
    <View style={styles.container}>
      <Text style = {{fontWeight: "bold", fontSize: 30}}>CAESAR CIPHER ENCODER AND DECODER</Text>
      <TextInput style={{ padding: 8, backgroundColor: '#f5f5f5'}}
      onChangeText={text => setCipher(text)}
      placeholder='Enter message'
      />
      <TextInput style={{ padding: 8, backgroundColor: '#f5f5f5' }}
      placeholder='Enter key'
      keyboardType='numeric'
      onChangeText={text => setShiftNum(text)}
      />
      <View style= {{flexDirection: "row", paddingTop: 10}}> 
      <View style = {{paddingRight: 20}}><Button  title='Encrypt'
      onPress={() => setDisplayText(encryptdecrypt(true, Cipher, shiftNum))}
      />
      </View>
      <Button title='Decrypt'
      onPress={() => setDisplayText(encryptdecrypt(false, Cipher, shiftNum))}
      />
      </View>
      <Text>{displayText}</Text>
      <StatusBar style="auto" />
    </View>
  );
}   

function checkValidNum(num){
  if (num){
    if (0 <= num && num < 26){
      return true
    }
  }
  return false;
}
/**
 * 
 * @param {boolean} encrypt 
 * @param {String} text 
 * @param {} shiftNum 
 * @returns 
 */
function encryptdecrypt(encrypt, text, shiftNum){
  shiftNum = Number(shiftNum);
  if (!checkValidNum(shiftNum)){
    return "Parameters invalid. make sure you entered a correct key";
  }
  if (encrypt){
    return encryption(text,shiftNum)
  }
  else{
    return decryption(text, shiftNum);
  }
}

//Uses caesar cipher to encrypt
function encryption(text, shiftNum){
  let newWord = [];
  for (const i in text){
    char = text[i];
    //If is a letter
    if (char.toUpperCase() != char.toLowerCase()){
      
      let charCode = text.charCodeAt(i);
      //If lowercase
      if(char == char.toLowerCase()){
        charCode = charCode-97 + shiftNum;
        newWord[i] = String.fromCharCode((charCode % 26) + 97);
      }
      //if uppercase
      else{
        charCode = charCode-65 + shiftNum;
        newWord[i] = String.fromCharCode((charCode % 26) + 65)
      }
      
      }
      //If a number
      else {
        newWord[i] = char;
      }
    }
    return newWord.toString().replaceAll(',', "");
  }
  //Decrypt
  function decryption(text, shiftNum){
    let newWord = [];
    for (const i in text){
      char = text[i];
      //If isnt a number
      if (char.toUpperCase() != char.toLowerCase()){
        let charCode = text.charCodeAt(i);
        //lowercase
        if(char == char.toLowerCase()){
          charCode = charCode-97 - shiftNum; 
          charCode = fixNegativeMods(charCode);
          newWord[i] = String.fromCharCode((charCode % 26) + 97);
        }
        //uppercase
        else{
          charCode = charCode-65 - shiftNum;
          charCode = fixNegativeMods(charCode);
          newWord[i] = String.fromCharCode((charCode % 26) + 65)
        }
        }
      //If a number
      else {
        newWord[i] = char;
      }
      }
      return newWord.toString().replaceAll(',', "");
    }
    //Translate negative javascript mods to be correct
    function fixNegativeMods(num){
      if (num < 0){
        return 26 - Math.abs(num)
      }
      return num
    }


const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
