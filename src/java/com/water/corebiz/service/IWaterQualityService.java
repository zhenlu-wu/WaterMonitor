package com.water.corebiz.service;


import java.util.Date;
import java.util.List;

import com.water.corebiz.entity.WaterQuality;

public interface IWaterQualityService 
{
    public void createWaterQuality(WaterQuality waterQuality);

    public void updateWaterQuality(WaterQuality waterQuality);
  
    public void deleteWaterQuality(Long waterQualityId);
    
    public List<WaterQuality> findWaterQualityOfDate(Date startTime,Date endTime);
  
    public List<WaterQuality> findWaterQualityOfWeek(Date date);
    
    public List<WaterQuality> findWaterQualityOfMonth(Date date,String oneDayOnetime);
    
    public List<WaterQuality> findWaterQualityOfYear(Date date,String oneDayOnetime);
}
