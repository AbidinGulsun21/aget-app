package agetjava.utils;
import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.HashMap;

import org.hibernate.mapping.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AgetUtils {


	 public static ResponseEntity<HashMap<String,Object>> responseBody(String path, String adi, ArrayList<Object> nesne) {

		 HashMap<String,Object> responseBody = new HashMap<String, Object>();

	        for (int i = 0; i < nesne.size(); i++) {
	            responseBody.put(adi, nesne.get(i));
	        }

	        responseBody.put("path", path);
	        responseBody.put("status", HttpStatus.OK);
	        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	    }

	    public static boolean isNullOrEmpty(Object o) {
	        if (o == null) {
	            return true;
	        } else if (o.getClass().isArray()) {
	            return o == null || ((Object[]) o).length == 0;
	        } else {
	            return o == null || o.toString().trim().equals("");
	        }
	    }
	    public static boolean isStringNullOrEmpty(String val) {
	        return val == null || val.equals("");
	    }

	    public static String getTarih(String tarih) {
	        if (isStringNullOrEmpty(tarih)) {
	            return null;
	        } else {
	            return tarih.substring(8, 10) + "/" + tarih.substring(5, 7) + "/" + tarih.substring(0, 4);
	        }
	    }
	    public static String getBugunkuTarih() {
	        GregorianCalendar calendar = new GregorianCalendar();
	        String day = String.valueOf(calendar.get(5));
	        String month = String.valueOf(calendar.get(2) + 1);
	        String year = String.valueOf(calendar.get(1));
	        if (day.length() == 1) {
	            day = "0" + day;
	        }

	        if (month.length() == 1) {
	            month = "0" + month;
	        }

	        return day + "/" + month + "/" + year;
	    }

	
}
