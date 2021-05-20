# 附加服务餐食预订流程方案设计
---

## 需求
人们购买保险的意识逐渐增强，与此同时，航空公司也推出了越来越多的保险品种，例如：航班延误险，航班取消险等。因此，越来越多的人为其旅行购买保险。
### 概述

用户在预订机票过程中或机票出票成功后可以选择并购买保险；目前是只有按照乘客来买的这种类型

### 分解

- 支持vip用户在购票过程中购买保险等附加服务。inpath
- 支持航司未注册用户在其他平台购买了本航司的机票后为行程购买保险等服务 AC
- 支持航司vip用户在官网购买了机票后，为行程购买附加服务。MMB

### 需求疑点及答复

vip用户在第三方平台购买了机票，可否在订单详情页面查看到并进行MMB方式购买保险等附加服务?

- 不可以


## 技术设计概述
### 影响范围
- Inpath: 搜索航班，选择航班，填写旅客信息，附加服务选择，支付页面，出票成功
- AC: 首页entrance入口，手机验证码登录，选择行程，附加服务选择，支付页面，出票成功
- MMB: 订单详情中附加服务入口，附加服务选择，支付页面，出票成功
- 路由配置

## 业务组件流程
- AC流程：首页附加服务tab——选择行程页面——附加服务选择页面——支付页面——出票成功
- inpath流程：航班选择页面——附加服务选择页面——支付页面——出票成功
- MMB流程：订单详情页面——附加服务选择页面——支付页面——出票成功
![](ancillaryMeal.jpg)

### 重难点分析

- 订购条件梳理
  1. MMB和全渠道购买餐食，且需满足客票状态为open for use
  2. 每个保险会有购买限制，不同类型的乘客有不同的限制，保险下面的passengerType字段来判断
  3. 一个旅客保险会有购买限制，在后台返回的数据的maxQuantityToBook字段
  
- UI状态与数据状态控制管理
	1. 旅客是否已选保险后的tab切换
	2. 购物车中是否有保险标识	
	3. 该保险是否会默认购买一份selectedByDefault字段

- 数据关联
 1. 目前的保险购买是没有分航段的，只有一个计价是否是按照航段计价的规则pricingBySegments字段
 
- 请求参数构建
 1. productId的获取
 2. 订购的时候resultSetId的存取(添加购物车的时候需要使用)


## 技术设计说明与边界


#### 工程与功能分支说明
|工程|分支|说明|
|:--|:--|:--|
|openmouse  | main_feature_ancillary |附加服务预订功能开发分支| 

#### 非功能性检查项
|非功能性检查项|	是/否	|简要说明|
|:----------|:----------|:----|
|1	|是否有多语言|	是|	
|2	|是否增加Mock|	是|	
|3	|是否有单元测试| 是|
	
#### 涉及应用模块说明
|涉及应用模块|是/否	|简要说明|
|:---------|:-----|:-----|
|1	|airui|		否	|
|2	|services|	是	|
|3	|business|	是	|
|4	|scene|	 是	|
> 可以动态的增加

## 开发计划
### 开发计划与时间
	开发计划应该与功能分解的内容一一对应，除了具体功能开发的时间计划，应该包含产品确认需求、设计稿、协调测试数据准备、联调测试等依赖第三方的时间计划，功能分支合并说明文档、技术文档迭代等时间计划。开发计划部分内容需要更新在conf需求管理页面的显著位置，当实际开发过程中计划不匹配时需要及时预警说明。
|序号	|任务	       |子任务	|优先级	| 工作量&时间计划	|负责人|
|:-----|:------       |:------|:----|:----------------|:----|
|1	|测试数据构建流程准备|-|1|1d| |	
|2	|AC入口开发UI及功能	|-|	2	|1.5d| |
|3	|行程选择页面开发	|-|	2	|1d| |
|4	|选择服务页面餐食UI组件开发	|-|	2 |	2d|	|
|5	|选择服务页面餐食数据联调，生单成功	|-|	2 |	2.5d| |
|6	|支付页面，出票成功页面集成兼容餐食附加服务两个信息|-|	2	|	1.5d |||
## TRP原有流程
略，后续补上
## 功能分解
1. 根据梳理的接口构建mock数据
    - 行程类型：往返
    - pnr分离（测试点,多个productId）
	- 乘客类型：成人,儿童，婴儿
	- 保险相关数据

2. 首页entrance附加服务查询AC入口开发
	- UI开发
	- 表单校验（formik）  
	- 接口开发 获取token,订单导入，刷新订单bookingid
	- 路由配置，判断路由到航班选择页面还是附加服务选择页

3. 行程选择页面开发
	- 选择行程组件开发，数据渲染 

4. 	附加服务选择页面保险UI组件开发

	- 进度条组件（progressBar，不同的入口方式不一样）
	- 旅客组件（passengerInfo）
	- 保险组件（insuranceInfo）
	- 保险详情组件（compensateInfo）
	- 航段详情组件（legInfo）
	- 保险操作组件（operation）
	- 购物车组件（AdditionalServices）
	
5. 选择服务页面保险数据联调和订购，生单成功
	- 创建保险，获取可用保险数据，保险选择，添加至购物车
	- 保险相关的状态管理
	- UI组件数据集成
	- 预定生产订单

6. 支付页面，出票成功页面添加保险信息
   - 附加服务保险详情信息展示模块（支付，出票成功页面均有）
   - AdditionalServicesInfo组件集成餐食相关信息
 
 > 注意公共组件和多语言和MOCK，单元测试  

## 附录

### 数据的调用


**MMB**

1.更新bookingId

- 模块：booking management
- 节点：POST /bookings/retrieval
- body：
	```
	{
	"bookingReference": "201901301318381969",
	}
	```
- RS：

	```
	{ "bookingId": "9356fe57-318b-4cf5-a210-d6b1bfd3bfdc" }
	```

2.查看订单详情

- 模块：booking
- 节点：GET /bookings/{bookingId}
- bookingId：从第1步更新bookingId返回的信息中获取
- 无body
- RS：
	```json
	{
	"bookingId": "9356fe57-318b-4cf5-a210-d6b1bfd3bfdc",
	"bookingReference": "201901301318381969",
	"totalPrice": {
	"amount": 25317,
	"currencyCode": "CNY"
	},
	"startDate": "2019-02-10",
	"endDate": "2019-02-10",
	"createdDateTime": "2019-01-30T05:18:54",
	"modifiedDateTime": "2019-01-30T05:21:17",
	"bookingStatus": "BOOKED",
	"additionalBookingStatus": "TICKET_SUCCESS",
	"flightProducts": [
	{
		.......
	```


3.获取保险数据

- 模块：insurance
- 节点：GET /bookings/9356fe57-318b-4cf5-a210-d6b1bfd3bfdc/products/1007/crossSell/insurance
- body：
	```json
	{

	}
	```
- RS：
	```json
    {
        "id":"d0e1b693-dd9f-4cdb-86d4-5e9adcc7bb07", 
        "insuranceOptions":
        [{
            "id": 1,
            "name": "航空综合险",
            "prices": [{"total": {"amount": 30.0, "currencyCode": "CNY"}}],
            "selectedByDefault": false,
            "policyLimitAmount": 3100000,
            "pricingBySegments": true,
            "maxQuantityToBook": 2,
            "insuranceClauseURL": "http://www.hnair.com/qt/assuranceinformation/",
            "insuranceDescriptionURL": "http://www.hnair.com/qt/assuranceinformation/",
            "passengerTypes": ["ADT"],
            "flightSegmentRefs": [{"flightSegmentId": "1", "boundId": 1}]
        },...]
    }
	
	```

> priceRange字段下min为：0，max不为0时，代表有免费餐食和付费餐食

4.添加到购物车
- 模块：booking product
- 节点：POST /bookings/{bookingId}/products/insurance
- bookingId： 从第1步更新bookingId返回的信息中获取
- 无body
- RS：
```json
    {
        "bookingProducts":[
        {"productId": 1004},
        ...
        ]
    }
```
5.确定预订（makeReservation）

- 模块：booking
- 节点：POST /bookings/{bookingId}/reservation
- bookingId： 从第1步更新bookingId返回的信息中获取
- 无body
- RS：
	```json
	{
	"bookingId": "9356fe57-318b-4cf5-a210-d6b1bfd3bfdc",
	"bookingReference": "201901301318381969"
	}
	```
	
6.从购物车中删除
- 模块：booking product
- 节点：DELETE /bookings/{bookingId}/products/insurance
- bookingId： 从第1步更新bookingId返回的信息中获取
- 无body
- RS：
```json
   {
           "bookingId":"b9395ade-4f6c-4e8c-afae-3e6ef76ee559", 
           "bookingReference":"201906041341061369"
   }
```

**inpath** 

- 前置步骤：进入到填写旅客信息后预定生单
- 与MMB一致

1. getBookingById（查看订单详情）
2. getInsurance（获取保险数据）


**AC流程**

1. 给用户发送验证码
- 模块：mfa
- 节点：/mfa/mobile
- body：
	```json
	{
	"authenticationType": "EXTERNAL_BOOKING_SEARCH",
	"mobile": "17711112222"
	}
	```

2. 登陆获取token
- 模块：authentication
- 节点：/authentication

3. 订单导入

- 模块：external flight booking
- 节点: /external/bookings/flights/retrieval
- body：
	```json
	{
	"documentId": "8802401290194",                                //票号
	"documentType": "FLIGHT_TICKET",
	"passengerName": {                                                 //该票号的乘机人姓名
	"firstName": "WANG",                             
	"surname": "XIAOQIONG",
	"title": "MRS"
	},
	"smsAuthentication": {
	"authCode": "8352",                                               //第一步发送的验证码
	"mobile": "17711112222"
	}
	}
	```

4. 刷新订单bookingid

- 模块：external flight booking
- 节点: /external/bookings/flights/import
- body：
	```json
	{
	"reservationId": "NBN3KS",                                             //从上一步的response中可以获取，这是订单的PNR
	"resultSetId": ""                                                               //上一步的responseid
	} 
	```

	后续流程请求与MMB一致





### 单元测试
 > 列举哪些组件需要单元测试，单元测试的点  
 