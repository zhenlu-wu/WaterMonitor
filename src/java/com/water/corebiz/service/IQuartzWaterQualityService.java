package com.water.corebiz.service;

public interface IQuartzWaterQualityService {
	//每小时/定时测试工作接口  不需要被前端访问
	public void executeTimingTestJob();
}
