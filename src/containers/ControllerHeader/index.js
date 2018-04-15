import ControllerHeader from './components/ControllerHeader'
import { connect } from 'react-redux'
import { getActiveFolder } from './selectors'
import { createPoint } from 'containers/MathObjects/Point/actions'
import { setActiveObject } from 'containers/MathObjects/services/activeObject/actions'
import {
  createFolder,
  setContentCollapsed
} from 'containers/MathObjects/Folder/actions'

const mapStateToProps = ( { activeObject, sortableTree } ) => {
  const treeRoot = sortableTree.root
  const activeFolder = getActiveFolder(sortableTree, activeObject)

  // TODO Move this to selector and write tests for it. Cases:
  // 1. activeObject is null
  // 2. activeObject is a folder
  // 3. activeObject is an item in a folder
  //
  // need correct itemInsertion / folderInsertion behavior in each case.
  //
  // If no active folder, insert new items into last folder
  const targetFolder = activeFolder || treeRoot[treeRoot.length - 1]
  const newFolderIndex = treeRoot.indexOf(targetFolder) + 1

  const newItemIndex = sortableTree[targetFolder].includes(activeObject)
    ? sortableTree[targetFolder].indexOf(activeObject) + 1
    : 0

  return {
    targetFolder,
    newFolderIndex,
    newItemIndex
  }
}

const mapDispatchToProps = ( {
  createPoint,
  createFolder,
  setActiveObject,
  setContentCollapsed
} )

export default connect(mapStateToProps, mapDispatchToProps)(ControllerHeader)