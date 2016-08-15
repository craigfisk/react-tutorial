/* scripts/tutorial10.js */

var d1 = new Date("2015-05-12 02:56:55.252544+00");
var d2 = new Date("2015-05-12 02:57:09.986458+00");
// d.toLocaleDateString()  --> '5/11/2015'

var data = [
  {photo_id: 1020, dt_added: d1.toLocaleDateString(), photo_src: "IMG_20150511_143139.jpg", caption: "Alaska cruise.  World-famous oatcake from **The Blue Scorcher** cafe and bakery in Astoria, OR (where they also offer organic dog biscuits)."},
  {photo_id: 1021, dt_added: d2.toLocaleDateString(), photo_src: "astoria_bar_pilot_pickup.JPG", caption: "*Alaska cruise*. Columbia river pilot being retrieved from the cruise ship Oceana Regatta by helicopter, after piloting the ship from its berth in Astoria, OR, out to the open Pacific Ocean."}
];

var Photo = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="photo">
        <h4 className="photoImage">
          {this.props.photo_src}
        </h4>
        <div>{this.props.dt_added}</div>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var PhotoBox = React.createClass({
  loadPhotosFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPhotosFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="photoBox">
        <h1>Photos</h1>
        <PhotoList data={this.state.data} />
        <PhotoForm />
      </div>
    );
  }
});

var PhotoList = React.createClass({
  render: function() {
    var photoNodes = this.props.data.map(function(photo) {
      return (
        <Photo photo_src={photo.photo_src} dt_added={photo.dt_added} key={photo.photo_id}>
          {photo.caption}
        </Photo>
      );
    });
    return (
      <div className="photoList">
        {photoNodes}
      </div>
    );
  }
});

var PhotoForm = React.createClass({
  render: function() {
    return (
      <div className="photoForm">
        Hello, world! I am a PhotoForm.
      </div>
    );
  }
});


ReactDOM.render(
  <PhotoBox url="/api/photos" pollInterval={2000} />,
  document.getElementById('content')
);
