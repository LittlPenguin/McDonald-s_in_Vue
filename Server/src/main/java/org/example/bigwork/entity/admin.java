package org.example.bigwork.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

//数据库注解
@Data
//指定表注解
@TableName("admin")//表明
@Schema(description = "管理员实体类")
public class admin {
    //ID自增长注解
    @TableId(type= IdType.AUTO)
    private long id;
    //告诉是表中的哪个字段注解-----名字一样可以省略
    @TableField("username")//表字段名
    private String username;
    private String userpswd;
    private String youname;
    private String sex;
    private String telphone;
    private String avator;


    public Object getUsername(admin admin) {
        return admin.getUsername();
    }
}
