# SilkChain
## A visual explorer of blockchain-based cryptocurrency transaction data
#### demo [演示](http://ipine.coding.me/silkChain/index.html)

### 备忘录

#### 数据情况

- 区块数量：总共爬了61个；时间跨度：2018-07-18 8:05:35 - 2018-07-18 15:38:13
- 交易数量：每个区块至多取10笔交易,有的区块内交易只有2笔或者6笔；交易数量总计600笔左右。
- 地址数量：前面有的每笔交易的输入输出地址都爬了，去除重复的总计444笔；
         其中20笔的地址无效或者由于判断条件设置问题导致没有爬取，最终地址数量422个。

#### 实验情况

- 区块数量：在61个区块里更新
- 交易数量：每个区块下展示两笔交易

使用数据：

>block_bit.json/block_bit.js  
>transactions_bit2.js
>addressinfo.json/addressinfo.js

#### 注
1 . data文件夹下的transactions_bit.js用来模拟首页能画多少个圆圈；
- 实验情况是：弄了20笔相同交易

2 . 在某个钱包地址页面，点击其所属的某笔交易信息，可能查看不到；原因是提取的交易数据中没有这笔交易。
（提取的所有区块都没有打包该笔交易，因而没有数据）
