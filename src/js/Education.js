/**
 * Created by Administrator on 2017/8/2.
 */
import React,{Component} from 'react';
import $ from 'jquery';



class Education extends Component{
    constructor() {
        super();
        this.state = {
            banner: [{"src": "", "id": ""}],
            aid: null,
            main_con: [{"id": "", "txt": "", "txt1": ""}],
            main_con1: [{"id": "", "txt": "", "txt1": ""}],
            uid: "",
        }
    }

    componentDidMount() {

        //上传图片
        // banner
        $.ajax({
            url: 'http://192.168.43.5:8005/banner3/banner3',
            type: 'get',
            success: function (b) {
                this.setState({
                    banner: b
                })
            }.bind(this)
        });
        var bannerCWrap= document.getElementById('bannerCWrap');
        bannerCWrap.onclick = function (e) {
            //删除轮播图片
            var ev = e || window.event;
            var target = ev.target || ev.srcElement;
            if (target.innerHTML == "修改") {
                var id = target.parentNode.parentNode.children[0].innerHTML;
                this.setState({
                    aid: id
                });
                $('.updateBox').css('display', 'block');
            }
        }.bind(this)

        //课程列表文字修改
        $.ajax({
            url: 'http://192.168.43.5:8005/main',
            type: 'get',
            success: function (e) {
                this.setState({main_con1: e});
            }.bind(this)
        });
    }


    setimg = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: "http://192.168.43.5:8005/banner3/ban3img",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                console.log(e)

                $.ajax({
                    type: "post",
                    url: "http://192.168.43.5:8005/banner3/upban3",
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

    render() {
        return (
            <div className="educationWrap">
                {/*栏目*/}
                <h3>banner图片</h3>
                <ul className="bannerC">
                    <li>id</li>
                    <li>img</li>
                </ul>
                {/*栏目完*/}
                {/*banner*/}
                <div id="bannerCWrap">
                    {this.state.banner.map(function (v, i) {
                        return <ul key={i} className="bannerC">
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
            </div>
        )
    }
}

export default Education;