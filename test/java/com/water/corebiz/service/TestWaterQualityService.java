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


public class TestWaterQualityService extends AbstractServiceIntegrationTest
{
	@Autowired
	private IWaterQualityService waterQualityService;
	
	//@Test
	//@Rollback(false)
	//@TransactionConfiguration(transactionManager="txMgr", defaultRollback=false)
	//@Transactional
	//@NotTransactional
	public void testCreateWaterQuality() throws InterruptedException 
	{		
				WaterQuality waterQuality = new WaterQuality();
				//waterQuality.setTemperature(Math.round(Math.random()*(32-0)+0));
				//waterQuality.setPhValue(Math.round(Math.random()*(10-0)+0)+"");
				//waterQuality.setSalinity(Math.round(Math.random()*(50-20)+20)+"");
				//waterQuality.setDissolvedOxygen(Math.round(Math.random()*(9-0)+0)+"");
				
				//waterQuality.setTurbidity(Math.round(Math.random()*(50-20)+20)+"");
				//Thread.sleep(3000);
				waterQuality.setCreateDate(new Date());
				waterQualityService.createWaterQuality(waterQuality);
		
	}
	
	//@Test
	@Transactional(readOnly=true)
	public void testFindWaterQualityByDate()
	{
		//Timestamp startTime = Timestamp.valueOf("2010-03-12 19:11:40");
		//List<WaterQuality> waterQualityList = waterQualityDAO.findWaterQualityByDate(new Date(2014-1900,9,9), new Date(2014-1900,9,10));
		List<WaterQuality> waterQualityList = waterQualityService.findWaterQualityOfDate(null, null);
		System.out.println("size:"+waterQualityList.size());
		
		for (WaterQuality wq : waterQualityList) {
			System.out.println(wq.getCreateDate());
		}
	}
	//@Test
	@Transactional(readOnly=true)
	public void testFindWaterQualityByWeek()
	{
		
		List<WaterQuality> waterQualityList = waterQualityService.findWaterQualityOfWeek(new Date());
		System.out.println("size:"+waterQualityList.size());
		
		for (WaterQuality wq : waterQualityList) {
			System.out.println(wq.getCreateDate());
		}
	}
	
	@Test
	@Transactional(readOnly=true)
	public void testFindWaterQualityByMonth()
	{
		
		List<WaterQuality> waterQualityList = waterQualityService.findWaterQualityOfMonth(new Date(),"12");
		System.out.println("size:"+waterQualityList.size());
		
		for (WaterQuality wq : waterQualityList) {
			System.out.println(wq.getCreateDate());
		}
	}
	
//	@Test
	@Transactional(readOnly=true)
	public void testFindWaterQualityByYear()
	{
		List<WaterQuality> waterQualityList = waterQualityService.findWaterQualityOfYear(new Date(),"12");
		System.out.println("size:"+waterQualityList.size());
		System.out.println(waterQualityList.get(0).getCreateDate());
		System.out.println(waterQualityList.get(waterQualityList.size()-1).getCreateDate());
	}
	
	
	
	
	
}
