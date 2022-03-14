import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { PostsList } from './features/posts/PostsList'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'

import { UserList } from './features/users/UserList'
import { UserPage } from './features/users/UserPage'

import { TodosList } from './features/todos/TodosList'
import { SingleTodosPage } from './features/todos/Single_TodosPage'

import { PhotoList } from './features/photo/PhotoList'
import { SinglePhotoPage } from './features/photo/SinglePhotoPage'

import { AlbumList } from './features/album/AlbumList'
import { SingleAlbumPage } from './features/album/SingleAlbumPage'

function App() {
  return (
    <Router>
      <div className="pages">
        <Navbar />
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  <PostsList />
                </React.Fragment>
              )}
            />

            <Route exact path="/posts/:postId" component={SinglePostPage} />
            <Route exact path="/editPost/:postId" component={EditPostForm} />

            <Route exact path="/users" component={UserList} />
            <Route exact path="/users/:userId" component={UserPage} />

            <Route exact path="/todos" component={TodosList} />
            <Route exact path="/todos/:todoId" component={SingleTodosPage} />

            <Route exact path="/photo" component={PhotoList} />
            <Route exact path="/photo/:photoId" component={SinglePhotoPage} />

            <Route exact path="/album" component={AlbumList} />
            <Route exact path="/album/:albumId" component={SingleAlbumPage} />

            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
