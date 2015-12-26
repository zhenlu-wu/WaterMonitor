/*
 * @(#)AbstractServiceIntegrationTest.java
 *
 * Copyright (c) 2009 AsiaSoft Company Limited. All Rights Reserved.
 */


package com.water.test.util;


import org.junit.runner.RunWith;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration (
    locations = {
    		"classpath:applicationContext.xml",
    		"classpath:applicationContext-beans.xml",
    		"classpath:applicationContext-quartz-cron-local.xml"
    }
)
public abstract class AbstractServiceIntegrationTest extends AbstractTransactionalJUnit4SpringContextTests
{

}
