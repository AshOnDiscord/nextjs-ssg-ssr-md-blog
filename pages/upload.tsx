export default function Upload() {
  function selectFile(e) {
    console.log(e)
    console.log(e.currentTarget.files)
  }

  return (
    <input type="file" accept=".md,text/markdown" onChange={selectFile} />
  ) 
}
