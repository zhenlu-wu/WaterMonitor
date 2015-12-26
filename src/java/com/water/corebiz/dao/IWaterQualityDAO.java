/*
 * @(#)ICustomerDAO.java
 *
 * Copyright (c) 2009 AsiaSoft Company Limited. All Rights Reserved.
 */


package com.water.corebiz.dao;

import java.util.Date;
import java.util.List;

import com.asiasoft.javaee.core.dao.IEntityDAO;
import com.water.corebiz.entity.WaterQuality;

/**
 * Class description goes here.
 * 
 * @version 1.00 2013-11-18
 * @author <a href="mailto:20010411@qq.com">Sailer Wen</a>
 */
public interface IWaterQualityDAO extends IEntityDAO<WaterQuality>
{
	public List<WaterQuality> findWaterQualityByDate(Date startTime,Date endTime);
	
	public List<WaterQuality> findWaterQualityByOneDayOnetime(Date startTime,Date endTime,String oneDayOnetime);

}
