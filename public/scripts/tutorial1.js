/* scripts/tutorial1.js */


var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, I am a CommentBox.
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('Fred')
);
