package com.water.web.action;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;








import org.apache.catalina.Session;
import org.apache.catalina.session.FileStore;
import org.apache.catalina.util.URLEncoder;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ParameterAware;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.FactoryBean;

import com.asiasoft.javaee.web.struts.action.BaseAction;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfWriter;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.water.corebiz.entity.WaterQuality;
import com.water.corebiz.service.IRealTimeWaterQualityService;
import com.water.corebiz.service.IWaterQualityService;


@SuppressWarnings("all") 
public class WaterQualityAction extends BaseAction implements ParameterAware, ModelDriven<WaterQuality>
{
	
	private static final long serialVersionUID = 1306889703123065085L;

	private Map<String, String[]>  parameters;
	
	
	private WaterQuality waterQuality = new WaterQuality();
	private List<WaterQuality> waterQualitys = new ArrayList<WaterQuality>();

	private Date startTime = null;
	private Date endTime = null;
	private String cycle = null;
	private Long totalCount;

	
	
	@Resource
	private IWaterQualityService waterQualityService;
	@Resource
	private IRealTimeWaterQualityService realTimeWaterQualityService;
	
	public String findWaterQualitys(){
		try {
			System.out.println(cycle);
			if("week".equals(cycle)){
				
				waterQualitys = waterQualityService.findWaterQualityOfWeek(startTime);
			}else if("month".equals(cycle)){
				
				waterQualitys = waterQualityService.findWaterQualityOfMonth(startTime,"12");
			}else if("year".equals(cycle)){
				
				waterQualitys = waterQualityService.findWaterQualityOfYear(startTime,"12");
			}else{
				System.out.println("startTime:"+startTime);
				System.out.println("endTime:"+endTime);
				waterQualitys = waterQualityService.findWaterQualityOfDate(startTime, endTime);
			}

			totalCount = (long) waterQualitys.size();
          
			return processSuccess();
		} catch (Exception ex) {
			return processException(ex);
		}
	}
	
	public String findRealTimeWaterQualityTestData(){
		try {
			
			String targetIpAddress = "192.168.1.102"; 
			int targetPort = 8080; 	
			//以后根据数据库生成
			String task="010300000006C5C8";
			String task2="02030000000C45FC";
			String task3="080300000010449F";
		
			waterQuality.setCreateDate(new Date());
			realTimeWaterQualityService.getRealTimeWaterQualityTestData( targetIpAddress, targetPort, task, waterQuality);
			
			realTimeWaterQualityService.getRealTimeWaterQualityTestData( targetIpAddress, targetPort, task2, waterQuality);
			
			realTimeWaterQualityService.getRealTimeWaterQualityTestData( targetIpAddress, targetPort, task3, waterQuality);
			return processSuccess();
		} catch (Exception ex) {
			return processException(ex);
		}
	}
	
	
	public String creatWaterQuality() throws NumberFormatException, Exception
	{

		try {
	
			
			waterQualityService.createWaterQuality(waterQuality);
			return processSuccess();
		} catch (Exception ex) {
			return processException(ex);
		}
		
		
	}
	
	public String updateWaterQuality(){
		try {
			waterQualityService.updateWaterQuality(waterQuality);
			return processSuccess();
		} catch (Exception ex) {
			return processException(ex);
		}
	}

	public String deteleWaterQualitys(){
		try {

			String[] params = (String[]) parameters.get("selectIds");
            for(String param : params)
	         {	
	        	 long selectId = new Long(param);
	        	 waterQualityService.deleteWaterQuality(selectId);
	         }         
			return processSuccess();
		} catch (Exception ex) {
			return processException(ex);
		}
	}

	 /**
     * @return the success
     */
    public String getSuccess()
    {
        return success;
    }
    
    /**
     * @return the errorMessage
     */
    public String getErrorMessage()
    {
        return errorMessage;
    }
    
	
	@Override
	public WaterQuality getModel() 
	{
		return waterQuality;
	}

	/**
	 * @param parameters the parameters to set
	 */
	public void setParameters(Map<String, String[]>  parameters) {
		this.parameters = parameters;
	}

	/**
	 * @return the waterQualityDTO
	 */
	public WaterQuality getWaterQuality() {
		return waterQuality;
	}

	/**
	 * @param waterQualityDTO the waterQualityDTO to set
	 */
	public void setWaterQuality(WaterQuality waterQualityDTO) {
		this.waterQuality = waterQualityDTO;
	}

	/**
	 * @return the waterQualityDTOs
	 */
	public List<WaterQuality> getWaterQualitys() {
		return waterQualitys;
	}

	/**
	 * @param waterQualityDTOs the waterQualityDTOs to set
	 */
	public void setWaterQualitys(List<WaterQuality> waterQualitys) {
		this.waterQualitys = waterQualitys;
	}

	

	
	/**
	 * @param totalCount the totalCount to set
	 */
	public void setTotalCount(Long totalCount) {
		this.totalCount = totalCount;
	}

	/**
	 * @return the totalCount
	 */
	public Long getTotalCount() {
		return totalCount;
	}



	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getCycle() {
		return cycle;
	}

	public void setCycle(String cycle) {
		this.cycle = cycle;
	}


	
	
}
