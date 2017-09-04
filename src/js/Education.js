
import React,{Component} from 'react';
import $ from 'jquery';
import config from './config'

class Garden extends Component{
    constructor() {
        super();
        this.state = {
            //banner 图片
            banner: [{"src": "", "id": ""}],
            aid: null,
            // 教育模式
            class:[{"id":"","text":""}],
            class1:[{"id":"","text":""}],
            eid:"",
            //班级详情
            myClass:[{"id":"","title":"","enTitle":"","con":"","src":""}],
            myClass1:[{"id":"","title":"","enTitle":"","con":"","src":""}],
            mid:"",
        //    特色教学文字修改
            xhrGreenRight:[{"id":"","text":""}],
            xhrGreenRight1:[{"id":"","text":""}],
            xid:"",
        //    小黄人图片
            xhrGreen:[{"id":"","src":""}],
            xhrGreen1:[{"id":"","src":""}],
            xhrid:"",
        //    照片墙左侧
            pictureCLeft:[{"id":"","src":""}],
            pictureCLeft1:[{"id":"","src":""}],
            lid:"",
            pictureCRight:[{"id":"","src":""}],
            pictureCRight1:[{"id":"","src":""}],
            rid:""
        }
    }
// banner修改图片
    setimg = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files);
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: config.url+"/banner3/ban3img",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                console.log(666)

                $.ajax({
                    type: "post",
                    url: config.url+"/banner3/upban3",
                    data: {"id": this.state.aid},
                    success: function (e) {
                        alert(e)
                    }.bind(this),
                    error: function () {
                        console.log("修改失败")
                    }
                });

            }.bind(this),
            error:function () {
                alert("上传失败")
            }
        })
    }.bind(this);
// banner修改图片完
    componentDidMount() {
        // banner
        $.ajax({
            url: config.url+'/banner3/banner3',
            type: 'get',
            success: function (b) {
                this.setState({
                    banner: b
                })
            }.bind(this)
        });
        var bannerBWrap= document.getElementById('bannerBWrap');
        bannerBWrap.onclick = function (e) {
            var ev = e || window.event;
            var target = ev.target || ev.srcElement;
            if (target.innerHTML == "修改") {
                var id = target.parentNode.parentNode.children[0].innerHTML;
                this.setState({
                    aid: id
                });
                $('.upBanner').css('display', 'block');
            }
        }.bind(this);
        //上传图片完
        var babyBanner= document.getElementById('babyBanner');
    //    banner end
    //    教育管理模式文字获取
        $.ajax({
            url:config.url+'/edu_class',
            type:'get',
            success:function(a){
                console.log(a);
                this.setState({class1:a});
            }.bind(this)
        });
        // 班级介绍数据调取
        $.ajax({
            url:config.url+'/edu_myClass',
            type:'get',
            success:function(a){
                console.log(a);
                this.setState({myClass1:a});
            }.bind(this)
        });
        // 班级介绍数据调取完
       //  特色教学文字调取
        $.ajax({
            url:config.url+'/edu_xhrGreenRight',
            type:'get',
            success:function(a){
                console.log(a);
                this.setState({xhrGreenRight1:a});
            }.bind(this)
        });
    //    小黄人图片调取
        $.ajax({
            url:config.url+'/edu_xhrGreen',
            type:'get',
            success:function(a){
                console.log(a);
                this.setState({xhrGreen1:a});
            }.bind(this)
        });
    //    照片墙左侧图片调取
        $.ajax({
            type: "get",
            url: config.url+"/edu_pic/edu_pic",
            success: function (e) {
                this.setState({pictureCLeft1:e});

            }.bind(this)
        });
    //    照片墙右侧图片调取
        $.ajax({
            type: "get",
            url: config.url+"/edu_pic1/edu_pic1",
            success: function (e) {
                this.setState({pictureCRight1:e});

            }.bind(this)
        });

    }
    //教育管理模式修改
    rev=function(event) {
        $(".eduCourse").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            eid: id,
        })
    }.bind(this);
    confirmfn() {
        var text = $(".eduCourse input:nth-of-type(1)").val();
        $(".eduCourse").css("display", "none");
        if (text == "") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: config.url+"/edu_class/upClass",
                data: {
                    id: this.state.eid,
                    text:text
                },
                success: function (e) {
                    this.setState({
                        edu_class: e
                    })
                }.bind(this),
                error: function () {
                    console.log("失败")
                }
            });
        }
    }

    //班级介绍详情文字修改
    myclass=function(event) {
        $(".classC").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        console.log(id)
        this.setState({
            mid: id,
        })
    }.bind(this);
    ok1(){
        var title = $(".classC input:nth-of-type(1)").val();
        var enTitle = $(".classC input:nth-of-type(2)").val();
        var con = $(".classC input:nth-of-type(3)").val();
        $(".classC").css("display", "none");
        if (title == "" || enTitle == ""||con=="") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: config.url+"/edu_myclass/upMyclass",
                data: {
                    id: this.state.mid,
                    title:title,
                    enTitle:enTitle,
                    con:con

                },
                success: function (e) {
                    this.setState({
                        myClass: e
                    })
                }.bind(this),
                error: function () {
                    console.log("失败")
                }
            });
        }
    }
    //班级介绍详情图片修改
    setimg2 = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: config.url+"/edu_myClass/eduimg",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                $.ajax({
                    type: "post",
                    url: config.url+"/edu_myClass/eduSrc",
                    data: {"id": this.state.mid},
                    success: function (e) {
                        alert(e)

                    }.bind(this),
                    error: function () {
                        console.log("修改失败")
                    }
                });
            }.bind(this),
            error: function () {
                alert("上传失败")
            }
        });
    }.bind(this);
    //特色教学文字修改
    special1=function(event) {
        $(".specialD").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        console.log(id)
        this.setState({
            xid: id,
        })
    }.bind(this);
    special2(){
        var text = $(".specialD input:nth-of-type(1)").val();
        $(".specialD").css("display", "none");
        if (text == "" ) {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: config.url+"/edu_xhrGreenRight/upSpecial",
                data: {
                    id: this.state.xid,
                    text:text
                },
                success: function (e) {
                    this.setState({
                        xhrGreenRight: e
                    })
                }.bind(this),
                error: function () {
                    console.log("失败")
                }
            });
        }
    }

    //小黄人图片修改
    xhrA=function(event){
        $(".xhrD").css("display","block");
        var id=event.target.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            xhrid:id
        })
    }.bind(this);
    setimg3 = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: config.url+"/edu_xhrGreen/xhrImg",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                $.ajax({
                    type: "post",
                    url: config.url+"/edu_xhrGreen/upXhr",
                    data: {"id": this.state.xhrid},
                    success: function (e) {
                        alert(e)

                    }.bind(this),
                    error: function () {
                        console.log("修改失败")
                    }
                });
            }.bind(this),
            error: function () {
                alert("上传失败")
            }
        });
    }.bind(this);

    //照片墙左侧图片修改

    pictureCLeft=function(event){
        $(".pictureD").css("display","block");
        var id=event.target.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            lid:id
        })
    }.bind(this);
    setimg4 = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: config.url+"/edu_pic/pic_img",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                $.ajax({
                    type: "post",
                    url: config.url+"/edu_pic/eduPic",
                    data: {"id": this.state.lid},
                    success: function (e) {
                        alert(e)

                    }.bind(this),
                    error: function () {
                        console.log("修改失败")
                    }
                });
            }.bind(this),
            error: function () {
                alert("上传失败")
            }
        });
    }.bind(this);

    //照片墙右侧图片修改
    pictureCRight=function(event){
        $(".picRd").css("display","block");
        var id=event.target.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            rid:id
        })
    }.bind(this);
    setimg5 = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: config.url+"/edu_pic1/picr_img",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                $.ajax({
                    type: "post",
                    url: config.url+"/edu_pic1/eduRPic",
                    data: {"id": this.state.rid},
                    success: function (e) {
                        alert(e)

                    }.bind(this),
                    error: function () {
                        console.log("修改失败")
                    }
                });
            }.bind(this),
            error: function () {
                alert("上传失败")
            }
        });
    }.bind(this);






    render() {
        return (
            <div className="gardenWrap">
                {/*栏目*/}
                <h3>banner图片</h3>
                <ul className="bannerB">
                    <li>id</li>
                    <li>img</li>
                </ul>
                {/*栏目完*/}
                {/*banner*/}
                <div id="bannerBWrap">
                    {this.state.banner.map(function (v, i) {
                        return <ul key={i} className="bannerB">
                            <li>{v.id}</li>
                            <li><img src={v.src}/></li>
                            <li>
                                <button id="babyBanner">修改</button>
                            </li>
                            <div className="upBanner">
                                <input type="file" ref="filaa1" onChange={this.setimg.bind(null, this.refs.filaa1)}/>
                            </div>
                        </ul>
                    }.bind(this))}
                </div>
                {/*banner完*/}
                {/*edu model  start*/}
                <h3>教育管理模式</h3>
                <div className="eduA">
                    <ul className="listA">
                        <li>id</li>
                        <li>text</li>
                    </ul>
                    <div className="listC" id="listC">
                        {this.state.class1.map((v,i)=>{
                            return <ul key={i} className="courseA">
                                <li>{v.id}</li>
                                <li>{v.text}</li>
                                <li><button onClick={this.rev}>修改</button></li>
                            </ul>
                        })}
                        <div className="eduCourse">
                            <input type="text" placeholder="text"/>
                            <button id="confirm" onClick={this.confirmfn.bind(this)}>确定</button>
                        </div>
                    </div>
                </div>
                {/*edu model  end*/}

                {/*class介绍*/}
                <div className="myClassWrap">
                    <h3>班级介绍详情</h3>
                    <div className="myClassIn">
                        <ul className="myClassTitle">
                            <li>id</li>
                            <li>src</li>
                            <li>title</li>
                            <li>enTitle</li>
                            <li>con</li>
                        </ul>
                        <div className="myClassCon">
                            {this.state.myClass1.map((v,i)=> {
                                return <ul key={i}>
                                    <li>{v.id}</li>
                                    <li><img src={v.src} alt="" className="myClassB"/></li>
                                    <li>{v.title}</li>
                                    <li>{v.enTitle}</li>
                                    <li>{v.con}</li>
                                    <li><button onClick={this.myclass}>修改</button></li>
                                </ul>
                            })}
                            <div className="classC">
                                <input type="text" placeholder="title"/>
                                <input type="text" placeholder="enTitle"/>
                                <input type="text" placeholder="con"/>
                                <input type="file" ref="filebb" onChange={this.setimg2.bind(null,this.refs.filebb)} multiple="multiple"/>
                                <button onClick={this.ok1.bind(this)}>确定</button>
                            </div>
                        </div>
                    </div>

                </div>
                {/*class介绍完*/}
                {/*特色教学 start*/}
                <div className="specialEdu">
                    <h3>特色教学</h3>
                    <ul className="specialB">
                        <li>id</li>
                        <li>text</li>
                    </ul>
                    {this.state.xhrGreenRight1.map((v,i)=> {
                        return <ul key={i} className="specialC">
                            <li>{v.id}</li>
                            <li>{v.text}</li>
                            <li><button onClick={this.special1}>修改</button></li>
                        </ul>
                    })}
                    <div className="specialD">
                        <input type="text" placeholder="text"/>
                        <button onClick={this.special2.bind(this)}>确定</button>
                    </div>
                </div>
                {/*特色教学 end*/}
                {/*特色教学 小黄人 start*/}
                <div className="xhrA">
                    <h3>小黄人图片</h3>
                    <ul>
                        <li>id</li>
                        <li>img</li>
                    </ul>
                    {this.state.xhrGreen1.map((v,i)=>{
                        return <ul className="xhrImg">
                            <li>{v.id}</li>
                            <li><img src={v.src} alt=""/></li>
                            <li><button onClick={this.xhrA}>修改</button></li>
                        </ul>
                    })}
                    <div  className="xhrD">
                        <input type="file" ref="file_pic" onChange={this.setimg4.bind(null,this.refs.file_pic)}/>
                    </div>
                </div>
                {/*特色教学 小黄人 end*/}
                {/*照片墙左侧 start*/}
                <div className="pictureA">
                    <h3>照片墙左侧图片</h3>
                    <ul className="pictureB">
                        <li>id</li>
                        <li>img</li>
                    </ul>
                    {this.state.pictureCLeft1.map(function (v, i) {
                        return <ul key={i} className="pictureCLeft">
                            <li>{v.id}</li>
                            <li><img src={v.src}/></li>
                            <li><button onClick={this.pictureCLeft}>修改</button></li>
                        </ul>
                    }.bind(this))}
                    <div  className="pictureD">
                        <input type="file" ref="file_pic" onChange={this.setimg4.bind(null, this.refs.file_pic)}/>
                    </div>
                   </div>
                {/*照片墙左侧 end*/}


                {/*照片墙右侧 start*/}
                <div className="picRa">
                    <h3>照片墙右侧图片</h3>
                    <ul className="picRb">
                        <li>id</li>
                        <li>img</li>
                    </ul>
                    {this.state.pictureCRight1.map(function (v, i) {
                        return <ul key={i} className="pictureCRight">
                            <li>{v.id}</li>
                            <li><img src={v.src}/></li>
                            <li><button onClick={this.pictureCRight}>修改</button></li>
                        </ul>
                    }.bind(this))}
                    <div  className="picRd">
                        <input type="file" ref="file_picR" onChange={this.setimg5.bind(null, this.refs.file_picR)}/>
                    </div>
                </div>
                {/*照片墙右侧 end*/}
            </div>
        )
    }
}

export default Garden;