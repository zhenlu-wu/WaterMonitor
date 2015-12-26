package com.water.corebiz.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Date;

import javax.annotation.Resource;

import com.water.corebiz.dao.IWaterQualityDAO;
import com.water.corebiz.entity.WaterQuality;
import com.water.corebiz.util.HexDateUtils;


public class QuartzWaterQualityService implements IQuartzWaterQualityService{
	@Resource
	private IWaterQualityDAO waterQualityDAO;
	
	@Override
	public void executeTimingTestJob() 
	{
		
		//以后的参数列表
				String targetIpAddress = "192.168.1.102"; 
				//String targetIpAddress = "192.168.1.100"; 
				int targetPort = 8080; 	
				String task="010300000006C5C8";//以后根据数据库生成
				
				//1.请求url获取实时数据
				Socket socket = null;  
				OutputStream writer = null;
				BufferedReader reader = null;
				WaterQuality waterQuality = null;
				
				try {
					socket = new Socket(targetIpAddress, targetPort);
					if(socket!=null){
						writer = socket.getOutputStream();
						writer.write(HexDateUtils.HexString2Bytes(task));
						writer.flush();
						InputStream is = socket.getInputStream();
						int i = 0;
						String tempHexString = "";
						while((i=is.read())!=-1){
								String hex = Integer.toHexString(i);
								if(hex.length()<2){
									tempHexString+=("0"+hex);
								}else{
									tempHexString+=hex;
								}
								if(tempHexString.length()==36)
									break;
						}

						if(tempHexString.substring(2, 4).equals("03")){
							String dateString = tempHexString.substring(6, 30);
							//System.out.println(dateString);
							//3.封装数据到对象
							waterQuality = new WaterQuality();
							waterQuality.setCreateDate(new Date());
							//chlorinity	氯度
							waterQuality.setChlorinity(HexDateUtils.HexString2Chlorinity(dateString.substring(0, 4)));
						
							//temperature	温度
							//System.out.println(dateString.substring(4, 8));
							waterQuality.setTemperature(HexDateUtils.HexString2Temperature(dateString.substring(4, 8)));
						
							//ph Value 
							//System.out.println(dateString.substring(20, 24));
							waterQuality.setPhValue(HexDateUtils.HexString2PH(dateString.substring(20, 24)));

//								waterQuality.setSalinity(Float.parseFloat(""));
//								waterQuality.setDissolvedOxygen(Float.parseFloat(""));
							
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
				}
		
			//4.持久化到数据库
			waterQualityDAO.save(waterQuality);	
		
		
	}

}
