package com.water.corebiz.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.struts2.json.annotations.JSON;

@Entity
@Table(name="waterquality")
public class WaterQuality 
{
	private Long id;
	private float chlorinity;//氯度
	private float temperature;//温度
	private float salinity;//盐度
	private float phValue ;//PH
	private float dissolvedOxygen;//溶氧度
	private String conductivity;//电导率
	private float turbidity;//混浊度
	
	private Date createDate;

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public float getTemperature() {
		return temperature;
	}

	public float getSalinity() {
		return salinity;
	}

	public float getPhValue() {
		return phValue;
	}

	public float getDissolvedOxygen() {
		return dissolvedOxygen;
	}

	public float getTurbidity() {
		return turbidity;
	}
	
	public String getConductivity() {
		return conductivity;
	}
	
	@Temporal(TemporalType.TIMESTAMP)
	@JSON(format="yyyy/MM/dd HH:mm:ss")
	public Date getCreateDate() {
		return createDate;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setTemperature(float temperature) {
		this.temperature = temperature;
	}

	public void setSalinity(float salinity) {
		this.salinity = salinity;
	}

	public void setPhValue(float phValue) {
		this.phValue = phValue;
	}

	public void setDissolvedOxygen(float dissolvedOxygen) {
		this.dissolvedOxygen = dissolvedOxygen;
	}

	public void setTurbidity(float turbidity) {
		this.turbidity = turbidity;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public float getChlorinity() {
		return chlorinity;
	}

	public void setChlorinity(float chlorinity) {
		this.chlorinity = chlorinity;
	}

	public void setConductivity(String conductivity) {
		this.conductivity = conductivity;
	}

	
	
	
}
