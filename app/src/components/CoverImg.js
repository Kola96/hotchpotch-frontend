import { PlayCircleOutlined } from '@ant-design/icons'
import './css/CoverImg.css'

const CoverImg = props => {
    return (
        <div className='cover' style={{ width: props.width }}>
            <img className='cover-img' alt={props.alt} src={props.src} />
            <div className='play-icon' style={{ display: props.isVideo ? 1 : 'none' }}>
                <PlayCircleOutlined style={{ fontSize: '50px' }} />
            </div>
            <div className='source'>
                <div className='left'>
                    <span>
                        {props.source}
                    </span>
                </div>
                <div className='right'>
                    <span>
                        {props.date}
                    </span>
                </div>
            </div>
        </div>
    )
}

export { CoverImg }