import { useRouter } from 'next/router'
import css from '@/styles/pages/watch.module.css'
import ArrowBack from '@material-ui/icons/ArrowBack'

export default function Watch() {
    const { query } = useRouter();
    const { anime, episode } = query;


    return (
        <>
            <div className={css.back} onClick={e => history.back()}>
                <ArrowBack fontSize='large' />
            </div>
            <div className={css.container}>
                <video className={css.video} controls={true} autoPlay={true}>
                    <source src="https://rr2---sn-bg07dnr7.googlevideo.com/videoplayback?expire=1642381804&amp;ei=bFHkYcu4K_iF_9EPv8GUkAc&amp;ip=193.70.57.76&amp;id=4e6c448885755a8d&amp;itag=18&amp;source=blogger&amp;susc=bl&amp;mime=video/mp4&amp;vprv=1&amp;dur=1500.264&amp;lmt=1549822062143798&amp;sparams=expire,ei,ip,id,itag,source,susc,mime,vprv,dur,lmt&amp;sig=AOq0QJ8wQwIgZDH-BPFAG5bs2o8I40XN9UiP5v3_jiSoLOArGCC_Q44CH3BiQl3WRXRAHY4ExmCceJQOZPD8FJnE_vw6lo_D9NI%3D&amp;rm=sn-25gkz7l,sn-u25-o8u67l&amp;req_id=3914b926cac1a3ee&amp;redirect_counter=2&amp;cms_redirect=yes&amp;ipbypass=yes&amp;mh=0c&amp;mip=2804:30c:935:8e00:6137:ecab:284e:8628&amp;mm=29&amp;mn=sn-bg07dnr7&amp;ms=rdu&amp;mt=1642353904&amp;mv=m&amp;mvi=2&amp;pl=43&amp;lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&amp;lsig=AG3C_xAwRgIhANCDfpBuOKlhi4csZ4GInPb-6SaKjPL0gs7r5OWzVFi6AiEA0TlmONLjzA_vTPkfONAp_wGfbH7ANUtI2Lq7DQrR9Yw%3D" type="video/mp4"/>
                </video>
            </div>
        </>
    )
}