/**
 * Created by J on 2017/4/12.
 */

(function (window) {
    function MdTOCNav(option) {
        this._init(option)
        this._do()
    }

    MdTOCNav.prototype = {
        _init: function (option) {
            this.el = option && option.el || 'main'  //传入id标识符
            this.rootArea = document.getElementById(this.el) || document.body
            this.level = option && option.level && option.level > 1 && option.level < 7 || 3    //要求option.level在2~6之间

            this.tocDataArr = []    //用于生成TOC存放的数据
            this.newTocData = {}    //用于push到TOC
            this.levelBoolean = ['H2', 'H3', 'H4', 'H5', 'H6']
            this.levelCount = [0, 0, 0, 0, 0]  //为了实现serialNum标题编号而计数

            //根据this.level值，动态更改遍历时需要判断是否在level层级内的判断数组levelBoolean
            this.levelBoolean = this.levelBoolean.slice(0, this.level - 1)

            this.tocLiHtmls = ''
            this.newTocLiHtml = ''
        },
        _createTocArr: function () {


            //遍历数组获取相关信息
            for (var i = 0; i < this.rootArea.children.length; i++) {
                var tagName = this.rootArea.children[i].tagName
                for (var x = 0; x < this.levelBoolean.length; x++) {
                    if (this.levelBoolean[x] === tagName) {
                        var that = this
                        // 此时x与h1~6建立联系
                        this.newTocData = {
                            className: 'mdh' + (x + 2),
                            serialNum: (function (that) {
                                that.levelCount[x]++
                                that.levelCount.splice(x + 1, that.levelCount.length - x -1, 0, 0, 0, 0, 0)    //上一层的计数变化时重置之后的计数
                                return that.levelCount.slice(0, x + 1).join('.')    //截取对应的编号应该有的数字，并转化为字符串
                            })(that),
                            targetId: 'mdTocNav' + this.newTocData.serialNum,
                            text: this.rootArea.children[i].innerText
                        }
                        this.tocDataArr.push(this.newTocData)
                        this.rootArea.children[i].id += (this.rootArea.children[i].id ? ' ' : '') + this.newTocData.targetId
                    }

                }
            }
        },
        _createNav: function () {
            for (var i = 0; i < this.tocDataArr.length; i++) {
                this.newTocLiHtml = '<li class="' + this.tocDataArr[i].className + '">' +
                    '<a href="#' + this.tocDataArr[i].targetId + '">' +
                    '<span class="nav-number">' + this.tocDataArr[i].serialNum + '</span>' +
                    '<span class="nav-text">' + this.tocDataArr[i].text + '</span>' +
                    '</a>' +
                    '</li>'
                this.tocLiHtmls += this.newTocLiHtml
            }
            var mdTocNav = document.createElement('ol')
            mdTocNav.setAttribute('id', 'mdTocNav')
            mdTocNav.innerHTML = this.tocLiHtmls
            document.body.appendChild(mdTocNav)
        },
        _do: function () {
            this._createTocArr()
            this._createNav()
        }
    }


    window.MdTOCNav = MdTOCNav

})(window)
