/**
 * Created by Administrator on 2017/8/2.
 */
import React, { Component } from 'react';
import $ from 'jquery';


class Baby extends Component{
    constructor(){
        super();
        this.state={
            model:[{"id":"","txt":""}],
            model1:[{"id":"","txt":""}],
            uid:"",

            park:[{"id":"","txt":""}],
            park1:[{"id":"","txt":""}],
            pid:""
        }
    }
    componentDidMount(){
        // model文字调取开始
        $.ajax({
            url:'http://192.168.43.5:8005/model',
            type:'get',
            success:function(b){
                console.log(b);
                this.setState({model1:b});
            }.bind(this)
        });
        // model文字调取结束
        // {/*.亲子主题乐园文字开始*/}
        $.ajax({
            url:'http://192.168.43.5:8005/baby_park',
            type:'get',
            success:function(b){
                console.log(b);
                this.setState({park1:b});
            }.bind(this)
        });
        // {/*.亲子主题乐园文字完*/}
    }
    //model文字修改
//     修改按钮
    modelClick=function(event) {
        $(".listCourse").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            uid: id,
        })
    }.bind(this)
    // 确定按钮    学校环境文字修改
    confirmfn(){
        $(".listCourse").css("display", "none");
        var txt = $(".listCourse input:nth-of-type(1)").val();


        if (txt== "") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: "http://192.168.43.5:8005/model/babyModel",
                data: {
                    id: this.state.uid,
                    txt: txt,
                },
                success: (e)=> {
                    this.setState({
                        model: e
                    })
                },
                error: function () {
                    console.log("失败")
                }
            });
        }
    }
//model文字修改完

    //park文字修改
//     修改按钮
    parkClick=function(event) {
        $(".listCourse1").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            pid: id,
        })
    }.bind(this)
    // 确定按钮    学校环境文字修改
    confirmfn1(){
        $(".listCourse1").css("display", "none");
        var txt = $(".listCourse1 input:nth-of-type(1)").val();


        if (txt=="") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: "http://192.168.43.5:8005/baby_park/parkModel",
                data: {
                    id: this.state.pid,
                    txt: txt,
                },
                success: (e)=> {
                    this.setState({
                        park: e
                    })
                },
                error: function () {
                    console.log("失败")
                }
            });
        }
    }
//park文字修改完
    render(){
        return (
            <div className="BabyWrap">
                {/*.model开始*/}
                <div className="modelWrap">
                    <h3>小孩文字</h3>
                    <ul>
                        <li>id</li>
                        <li>txt</li>
                    </ul>
                    {this.state.model1.map((con,i)=>{
                        return <ul key={i}>
                                <li>{con.id}</li>
                                <li>{con.txt}</li>
                                <li>
                                    <button onClick={this.modelClick}>修改</button>
                                </li>
                            </ul>
                    })}
                    <div className="listCourse">
                        <input type="text" placeholder="txt"/>
                        <button id="confirm" onClick={this.confirmfn.bind(this)}>确定</button>
                    </div>
                </div>
                {/*model结束*/}
                {/*.亲子主题乐园文字开始*/}
                <div className="parkWrap">
                    <h3>亲子主题乐园文字</h3>
                    <ul>
                        <li>id</li>
                        <li>txt</li>
                    </ul>
                    {this.state.park1.map((con,i)=>{
                        return <ul key={i}>
                            <li>{con.id}</li>
                            <li>{con.txt}</li>
                            <li>
                                <button onClick={this.parkClick}>修改</button>
                            </li>
                        </ul>
                    })}
                    <div className="listCourse1">
                        <input type="text" placeholder="txt"/>
                        <button id="confirm1" onClick={this.confirmfn1.bind(this)}>确定</button>
                    </div>
                </div>
                {/*亲子主题乐园文字结束*/}
            </div>
        )
    }
}
export default Baby;