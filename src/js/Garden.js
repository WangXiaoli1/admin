
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
        // picture1:[{"id":"","src":""}],
        pid:""

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
// banner修改图片完

    // // picture修改图片
    setimg1 = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files);
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
                console.log(666)

                $.ajax({
                    type: "post",
                    url: "http://192.168.43.5:8005/conB_picture/conb_picUp",
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


    // 照片墙图
    //上传图片
    $.ajax({
        url: 'http://192.168.43.5:8005/conB_picture/get',
        type: 'get',
        success: function (b) {
            this.setState({
                picture: b
            })
        }.bind(this)
    });
    var pictureBWrap= document.getElementById('pictureBWrap');
    pictureBWrap.onclick = function (e) {
        var ev = e || window.event;
        var target = ev.target || ev.srcElement;
        if (target.innerHTML == "修改") {
            var id = target.parentNode.parentNode.children[0].innerHTML;
            this.setState({
                pid: id
            });
            $('.updateBox1').css('display', 'block');
        }
    }.bind(this);
    //上传图片完
    // 照片墙完
}
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
    // 确定按钮
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
                        <div className="updateBox1">
                            <input type="file" ref="filaa1" onChange={this.setimg.bind(null, this.refs.filaa1)}/>
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
                        <li>
                            <button>修改</button>
                        </li>
                        <div className="updateBox">
                            <input type="file" ref="filaa1" onChange={this.setimg.bind(null, this.refs.filaa1)}/>
                        </div>
                    </ul>
                }.bind(this))}
            </div>
            {/*照片墙完*/}
        </div>
    )
}
}

export default Garden;