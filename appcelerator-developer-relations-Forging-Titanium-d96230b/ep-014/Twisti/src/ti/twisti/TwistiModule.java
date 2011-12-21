/**
 * This file was auto-generated by the Titanium Module SDK helper for Android
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2010 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */
package ti.twisti;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollInvocation;
import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;

import org.appcelerator.titanium.TiContext;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TiConfig;
import org.appcelerator.titanium.util.TiSensorHelper;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

@Kroll.module(name="Twisti", id="ti.twisti")
public class TwistiModule extends KrollModule implements SensorEventListener
{

	private static final String LCAT = "TiAccelerometer";
	private static final boolean DBG = TiConfig.LOGD;
	private static final String EVENT_UPDATE = "update";

	private boolean accelerometerRegistered = false;
	private float[] accelValues = null;
	private float[] magValues = null;
	private float[] R = new float[16];
	private float[] I = new float[16];
	private float[] outR = new float[16];
	private float[] orientation = new float[3];
	
	private boolean isReady = false;

	public TwistiModule(TiContext tiContext)
	{
		super(tiContext);
	}

	@Override
	public int addEventListener(KrollInvocation invocation, String eventName, Object listener)
	{
		if (!accelerometerRegistered) {
			if (EVENT_UPDATE.equals(eventName)) {
				TiSensorHelper.registerListener(Sensor.TYPE_ACCELEROMETER, this, SensorManager.SENSOR_DELAY_UI);
				TiSensorHelper.registerListener(Sensor.TYPE_MAGNETIC_FIELD, this, SensorManager.SENSOR_DELAY_UI);
				accelerometerRegistered = true;
			}
		}
		return super.addEventListener(invocation, eventName, listener);
	}

	@Override
	public void removeEventListener(KrollInvocation invocation, String eventName, Object listener)
	{
		if (accelerometerRegistered) {
			if (EVENT_UPDATE.equals(eventName)) {
				TiSensorHelper.unregisterListener(Sensor.TYPE_ACCELEROMETER, this);
				TiSensorHelper.unregisterListener(Sensor.TYPE_MAGNETIC_FIELD, this);
				accelerometerRegistered = false;
			}
		}
		super.removeEventListener(invocation, eventName, listener);
	}

	public void onAccuracyChanged(Sensor sensor, int accuracy)
	{
	}

	public void onSensorChanged(SensorEvent event)
	{
		switch (event.sensor.getType()) {
		case Sensor.TYPE_ACCELEROMETER:
			accelValues = event.values.clone();
			break;
		case Sensor.TYPE_MAGNETIC_FIELD:
			magValues = event.values.clone();
			isReady = true;
			break;
		}
		
		if (accelValues != null && magValues != null && isReady) {
			isReady = false;
			
			SensorManager.getRotationMatrix(R, I, accelValues, magValues);
			SensorManager.remapCoordinateSystem(R, SensorManager.AXIS_X, SensorManager.AXIS_Z, outR);
			SensorManager.getOrientation(outR, orientation);
			
			KrollDict data = new KrollDict();
			data.put("x", accelValues[0]);
			data.put("y", accelValues[1]);
			data.put("z", accelValues[2]);
			data.put("azimuth", orientation[0]);
			data.put("pitch", orientation[1]);
			data.put("roll", orientation[2]);
			fireEvent(EVENT_UPDATE, data);
		}
	}
}
