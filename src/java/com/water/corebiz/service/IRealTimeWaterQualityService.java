package com.water.corebiz.service;

import com.water.corebiz.entity.WaterQuality;

public interface IRealTimeWaterQualityService 
{
	//获取实时水质量测试数据 /s
	public WaterQuality getRealTimeWaterQualityTestData(String targetIpAddress,int targetPort,String task,WaterQuality waterQuality);
	
}
