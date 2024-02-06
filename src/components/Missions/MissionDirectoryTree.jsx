import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';




export const FolderMissionStruct = ({ treedata, onclickpath }) => {

    var parsedData = treedata;

    if (parsedData) {

        const renderTree = (node, depth = 0, parentFolder = '') => {
            const isFileSelectable = node.Type === 'file' && node.Name.endsWith('.bin');

            const renderIndentation = () => {
                const spaces = Array(depth * 2).fill('\u00A0').join('');
                return <span className="indentation">{spaces}</span>;
            };

            const handleFileClick = () => {
                if (isFileSelectable) {
                    onclickpath(parentFolder + '/' + node.Name);
                }
            };

            if (node.Type === 'directory') {
                return (
                    <div key={node.Name} className="directory">
                        {renderIndentation()}
                        <span className="icon">📁</span>
                        <span>{node.Name}</span>
                        <div className="children">
                            {node.Children.map((child) =>
                                renderTree(child, depth + 1, `${node.Name}`)
                            )}
                        </div>
                    </div>
                );
            } else if (node.Type === 'file') {
                return (
                    <div
                        key={node.Name}
                        className={`file${isFileSelectable ? ' selectable' : ''}`}
                        onClick={handleFileClick}
                    >
                        {renderIndentation()}
                        <span className="icon">📄</span>
                        <span>{node.Name}</span>
                    </div>
                );
            }
            return null;
        };

        return (
            
            <div id="rootdirdata">{renderTree(parsedData)}</div>

        );

    } else {
        return (
            
             <h6>no data available</h6>
            
        )
    }

};


FolderMissionStruct.propTypes = {
    treedata: PropTypes.string,
    onclickpath: PropTypes.func.isRequired,
};