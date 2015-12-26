package com.water.corebiz.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Date;

import com.water.corebiz.entity.WaterQuality;
import com.water.corebiz.util.HexDateUtils;


public class RealTimeWaterQualityService implements IRealTimeWaterQualityService {

	//数据处理
	//1 3 12 0 0 0 0 0 200 0 0 5 5 23 182 68 55 255 

	//01 03 0C 00 22 09 C4 00 C8 00 00 05 05 1C 20 D1 FB
	//02 03 0C 05 A0 07 30 00 00 00 00 00 00 00 00 3B A4 
	//String targetIpAddress,String targetPort,String task,WaterQuality waterQuality
	@Override
	public WaterQuality getRealTimeWaterQualityTestData(String targetIpAddress,int targetPort,String task,WaterQuality waterQuality) {

		//1.请求url获取实时数据
		Socket socket = null;  
		OutputStream writer = null;
		InputStream read = null;
		BufferedReader reader = null;
		
		
		try {
			socket = new Socket(targetIpAddress, targetPort);
			if(socket!=null){
				writer = socket.getOutputStream();
				read = socket.getInputStream();
				
				writer.write(HexDateUtils.HexString2Bytes(task));
				writer.flush();
				int i = 0;
				String tempHexString = "";
				while((i=read.read())!=-1){
						String hex = Integer.toHexString(i);
						if(hex.length()<2){
							tempHexString+=("0"+hex);
						}else{
							tempHexString+=hex;
						}
						if(tempHexString.length()==36)
							break;
				}
				
				
				//System.out.println("tempHexString:"+tempHexString);

				if(tempHexString.substring(0, 4).equals("0103")){
					String dateString = tempHexString.substring(6, 30);
					//chlorinity	氯度
					waterQuality.setChlorinity(HexDateUtils.HexString2Chlorinity(dateString.substring(0, 4)));
				
					//temperature	温度
					//System.out.println(dateString.substring(4, 8));
					waterQuality.setTemperature(HexDateUtils.HexString2Temperature(dateString.substring(4, 8)));
				
					//ph Value 
					//System.out.println(dateString.substring(20, 24));
					waterQuality.setPhValue(HexDateUtils.HexString2PH(dateString.substring(20, 24)));

//						waterQuality.setSalinity(Float.parseFloat(""));
//						waterQuality.setDissolvedOxygen(Float.parseFloat(""));
					
				}
				if(tempHexString.substring(0, 4).equals("0203")){
					String dateString = tempHexString.substring(8, 30);
					
					//DissolvedOxygen	溶氧量
					waterQuality.setDissolvedOxygen(HexDateUtils.HexString2DissolvedOxygen(dateString.substring(0, 4)));
				}
				if(tempHexString.substring(0, 4).equals("0803")){
					String dateString = tempHexString.substring(6, 30);
					//DissolvedOxygen	溶氧量
					waterQuality.setConductivity(HexDateUtils.convertHexToString(dateString.substring(2, 18)));
				}
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			if(writer!=null){
				try {
					writer.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if(reader!=null){
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if(socket!=null){
				try {
					socket.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return waterQuality;
	}
	

}
