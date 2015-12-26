package com.water.test.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DecimalFormat;

public class CreateSQL {
	public static void main(String[] args) throws IOException {
		StringBuffer sb = new StringBuffer();
		DecimalFormat df = new DecimalFormat("00");  
		
		int size = 20000;

		int ss = 0;
		int mm = 0;
		int hh = 8;
		int day = 8;
		int month = 10;
		int year = 2012;
		int id= 0;
		sb.append("INSERT INTO `waterquality`(id,createDate,dissolvedOxygen,phValue,salinity,temperature,chlorinity,turbidity) VALUES \n");
		for (int j = 1; j <= size; j++) {
			
			
//			sb.append("("+(id+=1)+",'"+year+"-"+df.format(month)+"-"+df.format(day)+" "+df.format(hh)+":"+df.format(mm)+":"+(ss+10)+"','8','6','21','21','22'),\n");
//			sb.append("("+(id+=1)+",'"+year+"-"+df.format(month)+"-"+df.format(day)+" "+df.format(hh)+":"+df.format(mm)+":"+(ss+20)+"','1','8','44','22','50'),\n");
//			sb.append("("+(id+=1)+",'"+year+"-"+df.format(month)+"-"+df.format(day)+" "+df.format(hh)+":"+df.format(mm)+":"+(ss+30)+"','6','1','40','28','33'),\n");
//			sb.append("("+(id+=1)+",'"+year+"-"+df.format(month)+"-"+df.format(day)+" "+df.format(hh)+":"+df.format(mm)+":"+(ss+40)+"','6','9','45','10','30'),\n");
//			sb.append("("+(id+=1)+",'"+year+"-"+df.format(month)+"-"+df.format(day)+" "+df.format(hh)+":"+df.format(mm)+":"+(ss+50)+"','8','5','30','25','41'),\n");
			//mm+=1;
			//if(mm==60){
			//	mm=0;
				hh+=1;
				if(hh==24){
					hh=0;
					day+=1;
					if(month==1 || month ==3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
						if(day>31){
							day=1;
							month+=1;
							if(month>12){
								month = 1;
								year+=1;
							}
						}
						
					}else if(month == 2){
						if(((year%100==0)&&(year%400==0))||((year%100!=0)&&(year%4==0))){
							if(day>29){
								day=1;
								month+=1;
							}
						}else{
							if(day>28){
								day=1;
								month+=1;
							}
						}
					}else{
						if(day>30){
							day=1;
							month+=1;
						}
					}
					
					
			
			}
			
			
			sb.append("("+(id+=1)+",'"+year+"-"+df.format(month)+"-"+df.format(day)+" "+df.format(hh)+":"+df.format(mm)+":"+df.format((ss+00))
			+"','"
			+Math.round(Math.random()*(8-4)+4)+"."+Math.round(Math.random()*(9-0)+0)
			+"','"
			+Math.round(Math.random()*(8-7)+7)+"."+Math.round(Math.random()*(4-0)+0)
			+"','"
			+Math.round(Math.random()*(38-31)+31)+"."+Math.round(Math.random()*(9-0)+0)
			+"','"
			+Math.round(Math.random()*(19-17)+17)+"."+Math.round(Math.random()*(9-0)+0)
			+"','"
			+"0.0"+Math.round(Math.random()*(3-1)+1)+Math.round(Math.random()*(9-0)+0)
			+"','22')");
			if(j!=size)
				sb.append(",\n");
			else
				sb.append(";\n");
		}
		
		
		FileWriter fo = new FileWriter(new File("c:/water.sql"));  
		BufferedWriter bw = new BufferedWriter(fo);
		bw.write(sb.toString());
	
		
	}
	
	public void createMore(){}
	
	public void orderBy(){
		
		
	}
}
