import React from "react";
import { PlayCircleOutlined } from '@ant-design/icons'
import './css/CoverImg.css'

class CoverImg extends React.Component {
    render() {
        return (
            <div className='cover' style={{ width: this.props.width }}>
                <img className='cover-img' alt={this.props.alt} src={this.props.src} />
                <div className='play-icon' style={{ display: this.props.isVideo ? 1 : 'none' }}>
                    <PlayCircleOutlined style={{ fontSize: '50px' }} />
                </div>
                <div className='source'>
                    <div className='left'>
                        <span>
                            {this.props.source}
                        </span>
                    </div>
                    <div className='right'>
                        <span>
                            {this.props.date}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export { CoverImg }