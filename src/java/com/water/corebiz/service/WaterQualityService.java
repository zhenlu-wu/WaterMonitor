package com.water.corebiz.service;


import java.util.Date;
import java.util.List;

import javax.annotation.Resource;











import org.apache.commons.beanutils.BeanUtils;

import com.asiasoft.javaee.core.exception.ApplicationException;
import com.water.corebiz.dao.IWaterQualityDAO;
import com.water.corebiz.entity.WaterQuality;
import com.water.corebiz.util.DateUtils;
import com.water.corebiz.util.ExceptionMessages;

public class WaterQualityService  implements IWaterQualityService
{
	@Resource
	private IWaterQualityDAO waterQualityDAO;
	
	@Override
	public void createWaterQuality(WaterQuality waterQuality) {
		waterQualityDAO.save(waterQuality);
		
	}

	@Override
	public void updateWaterQuality(WaterQuality waterQuality) {
		if (waterQuality == null || waterQuality.getId() == null) {
           throw new ApplicationException(ExceptionMessages.EXCEPTION_PARAMETER_INPUT_INPERFECT);
       }

       WaterQuality waterQualityTemp = waterQualityDAO.findById(waterQuality.getId());
       if (waterQualityTemp == null) {
           throw new ApplicationException(ExceptionMessages.EXCEPTION_OBJECT_DOES_NOT_EXIST);
       }
       
       try
       {
           BeanUtils.copyProperties(waterQualityTemp, waterQuality);
       }
       catch (Exception ex)
       {
           ex.printStackTrace();
           throw new ApplicationException("Exception caused while converting DTO into Entity: " + ex.getMessage());
       }
		waterQualityDAO.update(waterQualityTemp);
		
	}

	@Override
	public void deleteWaterQuality(Long waterQualityId) {
		if (waterQualityId == null) {
           throw new ApplicationException(ExceptionMessages.EXCEPTION_PARAMETER_INPUT_INPERFECT);
       }

       WaterQuality waterQuality = waterQualityDAO.findById(waterQualityId);
       if (waterQuality != null)
       {
       		waterQualityDAO.delete(waterQuality);
       }
	}


	@Override
	public List<WaterQuality> findWaterQualityOfDate(Date startTime, Date endTime) {
		
		return waterQualityDAO.findWaterQualityByDate(startTime, endTime);
	}

	@Override
	public List<WaterQuality> findWaterQualityOfWeek(Date date) {
		if(null==date){
			date = new Date();
		}

		return waterQualityDAO.findWaterQualityByDate(DateUtils.getMondayOfWeek(date), DateUtils.getNextMondayOfDate(date));
	}

	@Override
	public List<WaterQuality> findWaterQualityOfMonth(Date date,String oneDayOnetime) {
		if(null==date){
			date = new Date();
		}

		return waterQualityDAO.findWaterQualityByOneDayOnetime(DateUtils.getFirstDateOfMonth(date), DateUtils.nextMonthFirstDate(date),oneDayOnetime);
	}

	@Override
	public List<WaterQuality> findWaterQualityOfYear(Date date,String oneDayOnetime) {
		if(null==date){
			date = new Date();
		}

		return waterQualityDAO.findWaterQualityByOneDayOnetime(DateUtils.thisYearFirstDate(date),DateUtils.nextYearFirstDate(date),oneDayOnetime);
	}



}
