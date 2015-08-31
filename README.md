# fssaveditor

This application can decrypt and encrypt the fallout shelter save files. (Vault1.sav)

To manage this we need to decompile the apk file of Fallout Shelter. http://ibotpeaches.github.io/Apktool/

After this we need to decompile the following file: ..\assets\bin\Data\Managed\Assembly-CSharp.dll
(https://www.jetbrains.com/decompiler/) for the informations which are needed to decrypt the save file (Vault1.sav)

private const string _initVector = "tu89geji340t89u2";
private const int _keySize = 256;
private const int _passPhraseLength = 8;

The inforamtion is in StringCipher.cs
