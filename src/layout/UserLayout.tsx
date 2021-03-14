import React from 'react';

class UserLayout extends React.Component {
  public componentDidMount(): void {
    document.body.classList.add('background');
  }

  public componentWillUnmount(): void {
    document.body.classList.remove('background');
  }

  public render(): React.ReactNode {
    return (
      <>
        <div className="fixed-background" />
        <main>
          <div className="container">{this.props.children}</div>
        </main>
      </>
    );
  }
}

export default UserLayout;
