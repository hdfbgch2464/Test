package com.test.admin.module;

public class LayuiData {
    private Integer code;
    private String msg;
    private Long count;
    private Object data;

    public LayuiData() {

    }

    public LayuiData(Object data, Long count) {
        this.code = 200;
        this.msg = "";
        this.count = count;
        this.data = data;
    }

    public LayuiData(Integer code, Object data, Long count) {
        this.code = code;
        this.msg = "";
        this.count = count;
        this.data = data;
    }

    public LayuiData(Integer code, String msg, Long count, Object data) {
        this.code = code;
        this.msg = msg;
        this.count = count;
        this.data = data;
    }

    public static LayuiData ok(Object data, Long size) {
        return new LayuiData(data, size);
    }

    public static LayuiData ok(Integer code, Object data, Long size) {
        return new LayuiData(code, data, size);
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}