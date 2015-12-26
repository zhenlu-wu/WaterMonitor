/*
 * @(#)HibernateCustomerDAO.java
 *
 * Copyright (c) 2009 AsiaSoft Company Limited. All Rights Reserved.
 */


package com.water.corebiz.dao;


import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.asiasoft.commons.util.Assert;
import com.asiasoft.javaee.core.dao.HibernateSpringEntityDAO;
import com.asiasoft.javaee.util.Page;
import com.water.corebiz.entity.WaterQuality;

/**
 * Class description goes here.
 * 
 * @version 1.00 2013-11-18
 * @author <a href="mailto:20010411@qq.com">Sailer Wen</a>
 */
@SuppressWarnings("all")
public class HibernateWaterQualityDAO extends HibernateSpringEntityDAO<WaterQuality> implements IWaterQualityDAO
{
   
	@Override
	public List<WaterQuality> findWaterQualityByDate(final Date startTime,final Date endTime) {
      
      StringBuilder hqlStringBuilder = new StringBuilder();
      hqlStringBuilder.append("FROM WaterQuality waterquality");
      hqlStringBuilder.append(" where (:enterDateFrom IS NULL OR waterquality.createDate >= :enterDateFrom)");
      hqlStringBuilder.append(" AND (:enterDateTo IS NULL OR waterquality.createDate <= :enterDateTo)");

      final String hqlString = hqlStringBuilder.toString();

      List<WaterQuality> waterQualityList = (List<WaterQuality>) getHibernateTemplate().execute(new HibernateCallback<Object>() {
          public Object doInHibernate(Session hibernateSession) throws HibernateException, SQLException
          {
        	  Query query = hibernateSession.createQuery(hqlString);
              query.setParameter("enterDateFrom",startTime== null ?  dateFormat(getNextDay(new Date())) : dateFormat(startTime));
              query.setParameter("enterDateTo",endTime == null ? dateFormat(new Date()) :dateFormat(endTime));

              return query.list();
          }
      });

	  return waterQualityList;
	}
	
	@Override
	public List<WaterQuality> findWaterQualityByOneDayOnetime(final Date startTime,final Date endTime,final String oneDayOnetime) {
		 
	      StringBuilder hqlStringBuilder = new StringBuilder();
	      hqlStringBuilder.append("FROM WaterQuality waterquality");
	      hqlStringBuilder.append(" where (:enterDateFrom IS NULL OR waterquality.createDate >= :enterDateFrom)");
	      hqlStringBuilder.append(" AND (:enterDateTo IS NULL OR waterquality.createDate <= :enterDateTo)");
	      hqlStringBuilder.append(" AND (:oneDayOnetime IS NULL OR waterquality.createDate like :oneDayOnetime)");
	      final String hqlString = hqlStringBuilder.toString();


	      List<WaterQuality> waterQualityList = (List<WaterQuality>) getHibernateTemplate().execute(new HibernateCallback<Object>() {
	          public Object doInHibernate(Session hibernateSession) throws HibernateException, SQLException
	          {
	        	  Query query = hibernateSession.createQuery(hqlString);
	              query.setParameter("enterDateFrom",startTime== null ?  dateFormat(getNextDay(new Date())) : dateFormat(startTime));
	              query.setParameter("enterDateTo",endTime == null ? dateFormat(new Date()) :dateFormat(endTime));
	              query.setParameter("oneDayOnetime","% "+oneDayOnetime+":%");
	              return query.list();
	          }
	      });

		  return waterQualityList;
	}
	
	
	private  Date getNextDay(Date date) {		
		Calendar calendar = Calendar.getInstance();		
		calendar.setTime(date);		
		calendar.add(Calendar.DAY_OF_MONTH, -1);		
		date = calendar.getTime();		
		return date;	
	}
	
	private  String dateFormat(Date date) {		
		
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);	
	}

	
	
	
	

}
