import React from "react";
import rep from '../images/slide5.png'
import avatar from '../images/avatar.png'

/*<p class="profile__reports__report_info_name">name</p>
                    <div class="profile__reports__report_info_user">
                        <img src={avatar}/>
                        <p>nick</p>
                    </div>
                    <p class="profile__reports__report_info_date">dd.mm.gg</p> */

const ProfileReports = () => {
    const data = [{
        pic: '',
        user: {
            avatar: '',
            nik:  '',
        },
        name: '',
        date: ''
    }];


    return (
        <div class="profile__reports">
            <div class="profile__reports__report">
                <img src={rep} />
                <div class="profile__reports__report_info">
                <div class="profile__reports__report_info_name">
                    name
                </div>
                <div class="profile__reports__report_info_user">
                        <img src={avatar}/>
                        <div>nick</div>      
                </div>
                <div className="profile__reports__report_info_date">
                    13.08.2003
                </div>  
            </div>
            <div class="profile__reports__report_buttons">
                <div class="profile__reports__report_buttons_ok">
                    Принято
                </div>
                <div class="profile__reports__report_buttons_more">
                    Подробнее
                </div>
            </div>
        </div>
            <div class="profile__reports__report">
                

            </div>

        </div>
    );
};

export default ProfileReports;