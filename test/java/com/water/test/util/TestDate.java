package com.water.test.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TestDate {
	public static void main(String[] args) {
		System.out.println(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		//System.out.println(new Date().toGMTString());
		
	}
}
