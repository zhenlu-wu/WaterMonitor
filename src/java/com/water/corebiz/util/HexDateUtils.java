package com.water.corebiz.util;

public class HexDateUtils {
	/** 
	* 将两个ASCII字符合成一个字节； 
	* 如："EF"--> 0xEF 
	* @param src0 byte 
	* @param src1 byte 
	* @return byte 
	*/ 
	public static byte uniteBytes(byte src0, byte src1) { 
		byte _b0 = Byte.decode("0x" + new String(new byte[]{src0})).byteValue(); 
		_b0 = (byte)(_b0 << 4); 
		byte _b1 = Byte.decode("0x" + new String(new byte[]{src1})).byteValue(); 
		byte ret = (byte)(_b0 ^ _b1); 
		return ret;
	} 
	/** 
	* 将指定字符串src，以每两个字符分割转换为16进制形式 
	* 如："2B44EFD9" --> byte[]{0x2B, 0x44, 0xEF, 0xD9} 
	* @param src String 
	* @return byte[] 
	*/ 
	public static byte[] HexString2Bytes(String src){ 
		byte[] ret = new byte[8]; 
		byte[] tmp = src.getBytes(); 
		for(int i=0; i<8; i++){ 
			ret[i] = uniteBytes(tmp[i*2], tmp[i*2+1]); 
		} 
		return ret; 
	}
	
	public static float HexString2Chlorinity(String src){ 
		int number = Integer.parseInt(src,16);
		
		String temp = "0.";
		if(number<100){			 
			temp += String.format("%03d", number); 	
		}else if(number>999){
			temp = String.format("%1$,05d", number).replace(",", ".");
		}else{
			temp += number;
		}

		return Float.parseFloat(temp); 
	}
	public static float HexString2Temperature(String src){ 
		int number = Integer.parseInt(src,16);

		String temp ="";
		if(number>99){
			String tempString =number+"";
			for (int i = 0; i < tempString.length(); i++) {
				temp += tempString.charAt(i);
				if(tempString.length()-i == 3){
					temp +=".";
				}
			}
		}else{
			temp += "0."+String.format("%02d", number); 	
		}

		return Float.parseFloat(temp); 
	}
	
	public static float HexString2PH(String src){ 
		int number = Integer.parseInt(src,16);

		String temp ="";
		if(number>999){
			String tempString =number+"";
			for (int i = 0; i < tempString.length(); i++) {
				temp += tempString.charAt(i);
				if(tempString.length()-i == 4){
					temp +=".";
				}
			}
		}else{
			temp += "0."+String.format("%03d", number); 	
		}

		return Float.parseFloat(temp); 
	}
	
	public static float HexString2DissolvedOxygen(String src){ 
		int number = Integer.parseInt(src,16);
		
		String temp = "0.";
		if(number<100){			 
			temp += String.format("%03d", number); 	
		}else if(number>999){
			temp = String.format("%1$,05d", number).replace(",", ".");
		}else{
			temp += number;
		}

		return Float.parseFloat(temp); 
	}
	
	//十六进制和ASCII码互相转换。
	public static String convertHexToString(String hex){

		  StringBuilder sb = new StringBuilder();
		  StringBuilder temp = new StringBuilder();

		  //49204c6f7665204a617661 split into two characters 49, 20, 4c...
		  for( int i=0; i<hex.length()-1; i+=2 ){

		      //grab the hex in pairs
		      String output = hex.substring(i, (i + 2));
		      //convert hex to decimal
		      int decimal = Integer.parseInt(output, 16);
		      //convert the decimal to character
		      sb.append((char)decimal);

		      temp.append(decimal);
		  }

		  return sb.toString();
	}
	public static String convertStringToHex(String str){

		  char[] chars = str.toCharArray();
	
		  StringBuffer hex = new StringBuffer();
		  for(int i = 0; i < chars.length; i++){
		    hex.append(Integer.toHexString((int)chars[i]));
		  }
	
		  return hex.toString();
	}


	public static void main(String[] args) {
		System.out.println(HexDateUtils.convertHexToString("30303537322e3136"));
		
	}
}
