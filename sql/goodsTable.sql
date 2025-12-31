-- 先删除原有表（如果需要重建，谨慎执行！）
-- DROP TABLE IF EXISTS mcdonalds_goods;

-- 创建商品表（新增描述字段）
CREATE TABLE IF NOT EXISTS mcdonalds_goods (
    goods_id INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品ID',
    category ENUM('汉堡', '小食', '甜品', '饮品') NOT NULL COMMENT '分类',
    goods_name VARCHAR(100) NOT NULL COMMENT '商品名称',
    goods_desc VARCHAR(50) NOT NULL COMMENT '商品描述', -- 新增描述字段
    img_url VARCHAR(500) NOT NULL COMMENT '图片地址',
    price DECIMAL(5,2) NOT NULL COMMENT '商品价格（元）',
    calorie INT UNSIGNED NOT NULL COMMENT '卡路里（大卡）',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (goods_id),
    INDEX idx_category (category),
    INDEX idx_product_name (goods_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT '商品表';

-- 插入带价格、卡路里、创意描述的商品数据
INSERT INTO mcdonalds_goods (category, goods_name, goods_desc, img_url, price, calorie) VALUES 
-- 汉堡类
('汉堡', '板烧鸡腿堡', '鲜嫩鸡腿肉炭烤 多汁不腻超满足', './assets/Images/Menu/汉堡', 17.50, 420),
('汉堡', '不素之霸双层牛堡', '双层牛肉饼 肉食爱好者的快乐堡', './assets/Images/Menu/汉堡', 22.90, 580),
('汉堡', '汉堡包', '经典原味小堡 一口童年好滋味', './assets/Images/Menu/汉堡', 7.00, 250),
('汉堡', '吉士汉堡包', '香浓芝士+牛肉 简单又治愈', './assets/Images/Menu/汉堡', 8.50, 290),
('汉堡', '巨无霸', '三层口感 经典美式汉堡天花板', './assets/Images/Menu/汉堡', 21.90, 540),
('汉堡', '麦辣鸡腿汉堡', '香辣过瘾 外酥里嫩超够味', './assets/Images/Menu/汉堡', 18.50, 500),
('汉堡', '麦香鸡', '嫩滑鸡肉饼 麦香浓郁超适口', './assets/Images/Menu/汉堡', 11.00, 350),
('汉堡', '麦香鱼', '深海鳕鱼排 鲜香嫩滑无腥味', './assets/Images/Menu/汉堡', 16.00, 380),
('汉堡', '培根安格斯厚牛堡', '安格斯厚牛+培根 肉香爆棚', './assets/Images/Menu/汉堡', 32.90, 620),
('汉堡', '培根蔬萃双层牛堡', '双层牛肉+蔬菜 营养又满足', './assets/Images/Menu/汉堡', 26.90, 550),
('汉堡', '培根双层安格斯厚牛堡', '双层安格斯+培根 肉食狂欢', './assets/Images/Menu/汉堡', 36.90, 700),
('汉堡', '双层吉士汉堡', '双层牛肉+双层芝士 芝士控最爱', './assets/Images/Menu/汉堡', 14.00, 430),
('汉堡', '双层深海鳕鱼堡', '双层鳕鱼排 鲜掉眉毛超满足', './assets/Images/Menu/汉堡', 28.90, 490),
('汉堡', '酥酥多笋卷', '脆笋+酥皮 川味十足超够味', './assets/Images/Menu/汉堡', 12.90, 310),
('汉堡', '芝士安格斯厚牛堡', '安格斯厚牛+芝士 奶香浓郁', './assets/Images/Menu/汉堡', 29.90, 590),
('汉堡', '芝士双层安格斯厚牛堡', '双层安格斯+芝士 味蕾盛宴', './assets/Images/Menu/汉堡', 34.90, 680),

-- 小食类
('小食', '薄皮焦香V翅', '薄皮焦香 一口爆汁超解馋', './assets/Images/Menu/小食', 13.50, 180),
('小食', '脆脆薯条', '金黄酥脆 咔滋咔滋停不下来', './assets/Images/Menu/小食', 9.00, 220),
('小食', '麦辣鸡翅', '香辣酥脆 追剧必备小零食', './assets/Images/Menu/小食', 12.00, 190),
('小食', '麦乐鸡 (5块)', '外酥里嫩 蘸酱吃更有滋味', './assets/Images/Menu/小食', 10.00, 160),
('小食', '麦麦脆汁鸡（带骨里脊）', '外皮酥脆 内里爆汁超入味', './assets/Images/Menu/小食', 14.90, 210),
('小食', '麦麦脆汁鸡（琵琶腿）', '鲜嫩鸡腿肉 一口超满足', './assets/Images/Menu/小食', 13.90, 200),
('小食', '麦麦趣鸡球', '小巧玲珑 一口一个超过瘾', './assets/Images/Menu/小食', 11.90, 170),
('小食', '蜜汁BBQ风味薄皮脆汁鸡（带骨里脊）', 'BBQ风味 甜香浓郁超入味', './assets/Images/Menu/小食', 15.90, 220),
('小食', '蜜汁BBQ风味薄皮脆汁鸡（琵琶腿）', '蜜汁入味 鲜嫩多汁超好吃', './assets/Images/Menu/小食', 14.90, 210),
('小食', '那么大鸡排', '超大鸡排 外酥里嫩超满足', './assets/Images/Menu/小食', 16.90, 280),
('小食', '柠萌风味薄皮焦香V翅', '柠香清新 解腻又过瘾', './assets/Images/Menu/小食', 14.50, 190),
('小食', '苹果片', '清甜爽脆 健康解腻小食', './assets/Images/Menu/小食', 6.00, 35),
('小食', '薯条', '经典原味 麦当劳的灵魂小食', './assets/Images/Menu/小食', 7.50, 180),
('小食', '蒜了吧黄油风味薄皮脆汁鸡（带骨里脊）', '蒜香黄油 香气扑鼻超下饭', './assets/Images/Menu/小食', 15.90, 220),
('小食', '蒜了吧黄油风味薄皮脆汁鸡（琵琶腿）', '黄油蒜香 一口沦陷超美味', './assets/Images/Menu/小食', 14.90, 210),
('小食', '玉米杯', '香甜玉米粒 健康又美味', './assets/Images/Menu/小食', 6.50, 80),

-- 甜品类
('甜品', '奥利奥麦旋风', '奥利奥+冰淇淋 冰火两重天', './assets/Images/Menu/甜品', 12.00, 320),
('甜品', '草莓麦旋风', '草莓酱+冰淇淋 酸甜超治愈', './assets/Images/Menu/甜品', 12.00, 310),
('甜品', '草莓新地', '草莓酱+软冰淇淋 甜蜜暴击', './assets/Images/Menu/甜品', 8.00, 280),
('甜品', '迷你朱古力新地', '迷你size 解馋无负担', './assets/Images/Menu/甜品', 6.00, 180),
('甜品', '圆筒冰淇淋', '经典甜筒 一口清凉超解暑', './assets/Images/Menu/甜品', 3.00, 150),
('甜品', '朱古力新地', '浓郁巧克力 丝滑超满足', './assets/Images/Menu/甜品', 8.00, 290),

-- 饮品类
('饮品', '【美汁源】“黄金橙橙”', '鲜橙风味 清爽解腻超好喝', './assets/Images/Menu/饮品', 9.50, 110),
('饮品', '100%苹果汁', '纯鲜榨苹果汁 健康无添加', './assets/Images/Menu/饮品', 8.00, 100),
('饮品', '纯牛奶（盒装）', '营养纯牛奶 早餐好搭档', './assets/Images/Menu/饮品', 6.00, 150),
('饮品', '纯悦', '纯净饮用水 解渴超清爽', './assets/Images/Menu/饮品', 4.00, 0),
('饮品', '可口可乐', '经典肥宅快乐水 冰爽过瘾', './assets/Images/Menu/饮品', 6.50, 100),
('饮品', '麦旋酷阳光橙', '橙味冰饮 一口清凉超解暑', './assets/Images/Menu/饮品', 8.50, 120),
('饮品', '热朱古力', '暖心热巧 冬日治愈小确幸', './assets/Images/Menu/饮品', 9.00, 180),
('饮品', '无糖可口可乐', '无糖快乐水 畅饮无负担', './assets/Images/Menu/饮品', 6.50, 0),
('饮品', '锡兰红茶', '纯正锡兰红茶 茶香浓郁', './assets/Images/Menu/饮品', 5.00, 0),
('饮品', '雪碧', '柠檬味汽水 冰爽透心凉', './assets/Images/Menu/饮品', 6.50, 90),
('饮品', '阳光柠檬红茶', '柠檬+红茶 清爽解腻超搭', './assets/Images/Menu/饮品', 8.00, 110),
('饮品', '怡泉+C', '含维C汽水 酸甜超开胃', './assets/Images/Menu/饮品', 7.00, 80),
('饮品', '优品豆浆', '香浓热豆浆 暖心又暖胃', './assets/Images/Menu/饮品', 5.00, 80);