
import React,{Component} from 'react';
import $ from 'jquery';

class Garden extends Component{
constructor() {
    super();
    this.state = {
        banner: [{"src": "", "id": ""}],
        aid: null,

        environment:[{"id":"","title":"","entitle":"","leftA":"","leftB":"","leftC":"","rightA":""}],
        environment1:[{"id":"","title":"","entitle":"","leftA":"","leftB":"","leftC":"","rightA":""}],
        uid:"",

        picture:[{"id":"","src":""}],
        pid:null,

        introduce:[{"id":"","src":"","title":"","enTitleA":"","enTitleB":"","conA":"","conB":"","conC":"","btn":""}],
        introduce1:[{"id":"","src":"","title":"","enTitleA":"","enTitleB":"","conA":"","conB":"","conC":"","btn":""}],
        inid:"",



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
            url: "http://192.168.43.5:8005/banner2/ban2img",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                console.log(666)

                $.ajax({
                    type: "post",
                    url: "http://192.168.43.5:8005/banner2/upban2",
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
// picture修改图片完
componentDidMount() {
    // banner
   //上传图片
    $.ajax({
        url: 'http://192.168.43.5:8005/banner2/banner2',
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
            $('.updateBox').css('display', 'block');
        }
    }.bind(this);
    //上传图片完

    //学校环境文字调取
    $.ajax({
        url:'http://192.168.43.5:8005/conBenvir',
        type:'get',
        success:function(e){
            console.log(e);
            this.setState({environment1:e});
        }.bind(this)
    });
    //学校环境文字调取完


    // 照片墙图片获取
    $.ajax({
        url: 'http://192.168.43.5:8005/conB_picture/get',
        type: 'get',
        success: function (b) {
            this.setState({
                picture: b
            })
        }.bind(this)
    });


    // 介绍
    $.ajax({
        url:'http://192.168.43.5:8005/conB_introduce',
        type:'get',
        success:function(a){
            console.log(a);
            this.setState({introduce1:a});
        }.bind(this)
    });

    // 介绍完

    // var pictureBWrap= document.getElementById('pictureBWrap');
    // pictureBWrap.onclick = function (e) {
    //     var ev = e || window.event;
    //     var target = ev.target || ev.srcElement;
    //     if (target.innerHTML == "修改") {
    //         var id = target.parentNode.parentNode.children[0].innerHTML;
    //         this.setState({
    //             pid: id
    //         });
    //         $('.updateBox1').css('display', 'block');
    //     }
    // }.bind(this);
    //上传图片完
    // 照片墙完
}



    //照片墙图片修改
    setimg1 = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: "http://192.168.43.5:8005/conB_picture/conb_pic",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                $.ajax({
                    type: "post",
                    url: "http://192.168.43.5:8005/conB_picture/conb_picUp",
                    data: {"id": this.state.pid},
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
    //照片墙图片修改完
    //介绍图片修改
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
            url: "http://192.168.43.5:8005/conB_introduce/conB_introduceImg",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                $.ajax({
                    type: "post",
                    url: "http://192.168.43.5:8005/conB_introduce/conB_introduceImgUp",
                    data: {"id": this.state.inid},
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
   //介绍图片修改完
    picClick=function(event) {
        $(".updateBox1").css("display", "block");
        var dd = event.target;
        var id = dd.parentElement.parentElement.firstElementChild.innerHTML;
        console.log(id)
        this.setState({
            pid: id,
        })
    }.bind(this);


//学校环境文字修改
//     修改按钮
    conEnvir=function(event) {
        $(".listCourse").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            uid: id,
        })
    }.bind(this);
    // 确定按钮    学校环境文字修改
    confirmfn(){
    $(".listCourse").css("display", "none");
    var title = $(".listCourse input:nth-of-type(1)").val();
    var enTitle = $(".listCourse input:nth-of-type(2)").val();
    var leftA = $(".listCourse input:nth-of-type(3)").val();
    var leftB = $(".listCourse input:nth-of-type(4)").val();
    var leftC = $(".listCourse input:nth-of-type(5)").val();
    var rightA = $(".listCourse input:nth-of-type(6)").val();


    if (title == "" || enTitle == ""||leftA==""||leftB==""||leftC==""||rightA=="") {
    alert("不能为空")
} else {
    $.ajax({
        type: "post",
        url: "http://192.168.43.5:8005/conBenvir/conB_environ",
        data: {
            id: this.state.uid,
            title: title,
            enTitle: enTitle,
            leftA: leftA,
            leftB: leftB,
            leftC: leftC,
            rightA: rightA
        },
        success: (e)=> {
            this.setState({
                environment: e
            })
        },
        error: function () {
            console.log("失败")
        }
    });
}
}
//学校环境文字修改完


//介绍文字修改
//     修改按钮
    conIntroduce=function(event) {
        $(".listIntroduce").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            inid: id,
        })
    }.bind(this);
    // 确定按钮    学校环境文字修改
    confirmfn1(){
        $(".listIntroduce").css("display", "none");
        // var src = $(".listCourse input:nth-of-type(1)").val();
        var title = $(".listIntroduce input:nth-of-type(2)").val();
        var enTitleA = $(".listIntroduce input:nth-of-type(3)").val();
        var enTitleB = $(".listIntroduce input:nth-of-type(4)").val();
        var conA = $(".listIntroduce input:nth-of-type(5)").val();
        var conB = $(".listIntroduce input:nth-of-type(6)").val();
        var conC = $(".listIntroduce input:nth-of-type(7)").val();
        var btn = $(".listIntroduce input:nth-of-type(8)").val();





        if (title == ""||enTitleA==""||enTitleB==""||conA==""||conB==""||conC==""||btn=="") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: "http://192.168.43.5:8005/conB_introduce/conB_introduce1",
                data: {
                    id: this.state.inid,
                    // src:src,
                    title: title,
                    enTitleA: enTitleA,
                    enTitleB: enTitleB,
                    conA: conA,
                    conB: conB,
                    conC: conC,
                    btn: btn,
                },

                success: (e)=> {
                    this.setState({
                        introduce: e
                    })
                },
                error: function () {
                    console.log("失败")
                }
            });
        }
    }
//介绍文字修改完
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
                            <button>修改</button>
                        </li>
                        <div className="updateBox">
                            <input type="file" ref="filaa" onChange={this.setimg.bind(null, this.refs.filaa)}/>
                        </div>
                    </ul>
                }.bind(this))}
            </div>
            {/*banner完*/}
            {/*学校环境文字*/}
            <div className="environment" id="environment">
                <h3>学校环境</h3>
                <ul className="title">
                    <li>id</li>
                    <li>title</li>
                    <li>entitle</li>
                    <li>leftA</li>
                    <li>leftB</li>
                    <li>leftC</li>
                    <li>rightA</li>
                </ul>
                {this.state.environment1.map((e,i)=> {
                    return <div key={i}>
                        <ul>
                            <li>{e.id}</li>
                            <li><button onClick={this.conEnvir}>修改</button></li>
                        </ul>
                        <ul>
                            <li>{e.title}</li>
                        </ul>
                        <ul>
                            <li>{e.enTitle}</li>
                        </ul>
                        <ul>
                            <li>{e.leftA}</li>
                        </ul>
                        <ul>
                            <li>{e.leftB}</li>
                        </ul>
                        <ul>
                            <li>{e.leftC}</li>
                        </ul>
                        <ul>
                            <li>{e.rightA}</li>
                        </ul>
                        <div className="listCourse">
                            <input type="text" placeholder="title"/>
                            <input type="text" placeholder="entitle"/>
                            <input type="text" placeholder="leftA"/>
                            <input type="text" placeholder="leftB"/>
                            <input type="text" placeholder="leftC"/>
                            <input type="text" placeholder="rightA"/>
                            <button id="confirm" onClick={this.confirmfn.bind(this)}>确定</button>
                        </div>
                    </div>
                })}
            </div>
            {/*学校环境完*/}

            {/*照片墙*/}
            <div id="pictureBWrap">
                <h3>照片墙</h3>
                <ul className="pictureBTitle">
                    <li>id</li>
                    <li>img</li>
                </ul>
                {this.state.picture.map(function (v, i) {
                    return <ul key={i} className="pictureB">
                        <li>{v.id}</li>
                        <li><img src={v.src}/></li>
                        <li><button onClick={this.picClick}>修改</button></li>
                    </ul>
                }.bind(this))}
                <div className="updateBox1">
                    <input type="file" ref="filaa1" onChange={this.setimg1.bind(this, this.refs.filaa1)}/>
                </div>

            </div>
            {/*照片墙完*/}

            {/*介绍*/}
            <div id="introduceBWrap">
                <h3>介绍</h3>

                <ul className="title">
                    <li>id</li>
                    <li>src</li>
                    <li>title</li>
                    <li>enTitleA</li>
                    <li>enTitleB</li>
                    <li>conA</li>
                    <li>conB</li>
                    <li>conC</li>
                    <li>btn</li>
                </ul>

                {this.state.introduce1.map((e,i)=> {
                    return <div key={i} className="introduce">
                        <ul>
                            <li>{e.id}</li>
                            <li><button onClick={this.conIntroduce}>修改</button></li>
                        </ul>

                        <ul>
                            <li><img src={e.src} alt=""/></li>
                        </ul>
                        <ul>
                            <li>{e.title}</li>
                        </ul>
                        <ul>
                            <li>{e.enTitleA}</li>
                        </ul>
                        <ul>
                            <li>{e.enTitleB}</li>
                        </ul>
                        <ul>
                            <li>{e.conA}</li>
                        </ul>
                        <ul>
                            <li>{e.conB}</li>
                        </ul>
                        <ul>
                            <li>{e.conC}</li>
                        </ul>
                        <ul>
                            <li>{e.btn}</li>
                        </ul>
                        <div className="listIntroduce">
                            <input type="file" ref="filaa2" onChange={this.setimg2.bind(this, this.refs.filaa2)}/>
                            <input type="text" placeholder="title"/>
                            <input type="text" placeholder="enTitleA"/>
                            <input type="text" placeholder="enTitleB"/>
                            <input type="text" placeholder="conA"/>
                            <input type="text" placeholder="conB"/>
                            <input type="text" placeholder="conC"/>
                            <input type="text" placeholder="btn"/>
                            <button id="confirm1" onClick={this.confirmfn1.bind(this)}>确定</button>
                        </div>
                    </div>
                })}
            </div>
            {/*介绍完*/}
        </div>
    )
}
}

export default Garden;