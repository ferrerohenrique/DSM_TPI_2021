import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

const AlbumList = ({navigation}) => {
  const [photoset, setPhotoSet] = useState(null);

  useEffect(() => {
    const fetchPhotoset = async () => {
      const {data} = await axios.get(
        'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
      );
      setPhotoSet(data.photosets.photoset);
    };
    fetchPhotoset();
  }, []);

  const renderItem = ({item}) => (
    <AlbumDetail
      navigation={navigation}
      key={item.id}
      title={item.title._content}
      albumId={item.id}
    />
  );

  if (!photoset) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList data={photoset} renderItem={renderItem} />
    </View>
  );
};

export default AlbumList;

//Componente de Clase

// class AlbumList extends Component {
//   state = {photoset: null};

//   componentWillMount() {
//     axios
//       .get(
//         'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
//       )
//       .then((response) =>
//         this.setState({photoset: response.data.photosets.photoset}),
//       );
//   }

//   renderAlbums() {
//     return this.state.photoset.map((album) => (
//       <AlbumDetail
//         navigation={this.props.navigation}
//         key={album.id}
//         title={album.title._content}
//         albumId={album.id}
//       />
//     ));
//   }

//   render() {
//     console.log(this.state);

//     if (!this.state.photoset) {
//       return <Text>Loading...</Text>;
//     }

//     return (
//       <View style={{flex: 1}}>
//         <ScrollView>{this.renderAlbums()}</ScrollView>
//       </View>
//     );
//   }
// }

// export default AlbumList;
