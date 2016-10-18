import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class EditablePlanTable extends React.Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return(
            <div>
                <div className="plan-table-header">
                    <div>年間区分</div>
                    <div>１期（４月〜６月）</div>
                    <div>２期（７月〜９月）</div>
                    <div>３期（10月〜12月）</div>
                    <div>４期（１月〜３月）</div>
                </div>

                <div className="plan-table-row">
                    <div className="item-caption">ねらい</div>
                    <div>
                        <div className="inside-block dialog-trigger"
                             label="Dialog"
                             onClick={ this.handleOpen }>
                        </div>
                        <Dialog
                            modal={ false }
                            open={ this.state.open }
                            onRequestClose={ this.handleClose }
                        >
                            <h1 className="dialog-title">ねらい</h1>
                            <TextField
                                multiLine={ true }
                                rows={ 10 }
                                rowsMax={ 10 }
                                fullWidth={ true }
                                defaultValue="整った環境の中で一人ひとりの子どもの状態を十分観察し、安心して過ごす。&#13;
                                            一人ひとりの子どもの生活リズムを重視して、食欲・睡眠・排泄などの生理的要求を満たす。&#13;
                                            個人差に応じて授乳を行い、離乳を進める。&#13;
                                            スキンシップを十分に摂りながら心身共に快適な状態を作り情緒の安定を図るようにする。&#13;
                                            安全で活動しやすい環境の下、寝帰りなど運動的な活動を促す。&#13;"
                            />
                        </Dialog>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                </div>

                <div className="plan-table-row">
                    <div className="item-caption">配慮</div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                </div>

                <div className="plan-table-row">
                    <div className="item-group-caption nursecare">養護</div>
                    <div className="item-group-caption">
                        <div className="item-detail-caption">生命</div>
                        <div className="item-detail-caption">情緒</div>
                        <div className="item-detail-caption">健康</div>
                        <div className="item-detail-caption">人間関係</div>
                    </div>
                    <div className="item-content-col">
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                    </div>
                    <div className="item-content-col">
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                    </div>
                    <div className="item-content-col">
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                    </div>
                    <div className="item-content-col">
                        <div style={{ borderRight: 0 }}>
                            <div className="inside-block"></div>
                        </div>
                        <div style={{ borderRight: 0 }}>
                            <div className="inside-block"></div>
                        </div>
                        <div style={{ borderRight: 0 }}>
                            <div className="inside-block"></div>
                        </div>
                        <div style={{ borderRight: 0 }}>
                            <div className="inside-block"></div>
                        </div>
                    </div>
                </div>

                <div className="plan-table-row">
                    <div className="item-group-caption teaching">教育</div>
                    <div className="item-group-caption">
                        <div className="item-detail-caption">環境</div>
                        <div className="item-detail-caption">言葉</div>
                        <div className="item-detail-caption">表現</div>
                    </div>
                    <div className="item-content-col">
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                    </div>
                    <div className="item-content-col">
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                    </div>
                    <div className="item-content-col">
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                        <div>
                            <div className="inside-block"></div>
                        </div>
                    </div>
                    <div className="item-content-col">
                        <div style={{ borderRight: 0 }}>
                            <div className="inside-block"></div>
                        </div>
                        <div style={{ borderRight: 0 }}>
                            <div className="inside-block"></div>
                        </div>
                        <div style={{ borderRight: 0 }}>
                            <div className="inside-block"></div>
                        </div>
                    </div>
                </div>

                <div className="plan-table-row">
                    <div className="item-caption">食育</div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                </div>

                <div className="plan-table-row">
                    <div className="item-caption">
                        <p>保護者支援</p>
                        <p>地域支援</p>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                    <div>
                        <div className="inside-block"></div>
                    </div>
                </div>

                <div className="plan-table-footer"></div>
                
            </div>
        );
    }
}
