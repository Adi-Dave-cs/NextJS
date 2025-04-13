import User from '@/models/User';
import Todo from '@/models/Todo';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

// solved the issue while deploying on vercel
type Param = {
  params: Promise<{
    userid: string;
  }>;
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const users = await User.find();

    const filteredUsers= users.filter(u=>u.role!=='admin');

    if (!filteredUsers)
      return NextResponse.json('No Todos to be found', { status: 404 });

    return NextResponse.json(filteredUsers.sort((a, b) =>
        a.userName.localeCompare(b.userName)
      ), { status: 200 });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context:Param) {
  try {
    await dbConnect();
    const { id } = await request.json();
    const user = await User.findById({_id: id});

    const deleteduser = await User.findByIdAndDelete({ _id: id });
    const deleteduserTodos = await Todo.deleteMany({userName : user.userName});

    if (!deleteduser || !deleteduserTodos) return NextResponse.json('No such User!', { status: 404 });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to Delete todos' },
      { status: 500 }
    );
  }
}