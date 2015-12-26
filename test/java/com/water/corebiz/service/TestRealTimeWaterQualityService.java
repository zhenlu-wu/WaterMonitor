package com.water.corebiz.service;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.NotTransactional;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.water.corebiz.dao.IWaterQualityDAO;
import com.water.corebiz.entity.WaterQuality;
import com.water.test.util.AbstractServiceIntegrationTest;


public class TestRealTimeWaterQualityService extends AbstractServiceIntegrationTest
{
	@Autowired
	private IRealTimeWaterQualityService realTimeWaterQualityService;
	
	@Test
	@Transactional(readOnly=true)
	public void testGetRealTimeWaterQualityTestData()
	{
		//以后的参数列表
		//String targetIpAddress = "192.168.1.102"; 
		String targetIpAddress = "192.168.1.100"; 
		int targetPort = 8080; 	
		String task="010300000006C5C8";//以后根据数据库生成
		String task2="02030000000C45FC";
		String task3="080300000010449F";
		WaterQuality waterQuality = new WaterQuality();;
		waterQuality.setCreateDate(new Date());
		realTimeWaterQualityService.getRealTimeWaterQualityTestData( targetIpAddress, targetPort, task, waterQuality);
		
		realTimeWaterQualityService.getRealTimeWaterQualityTestData( targetIpAddress, targetPort, task2, waterQuality);
		
		realTimeWaterQualityService.getRealTimeWaterQualityTestData( targetIpAddress, targetPort, task3, waterQuality);
	
		System.out.println(waterQuality.getChlorinity());
		System.out.println(waterQuality.getTemperature());
		System.out.println(waterQuality.getPhValue());
		System.out.println(waterQuality.getDissolvedOxygen());
		System.out.println(waterQuality.getConductivity());
	}
	
	
	
	
	
}
