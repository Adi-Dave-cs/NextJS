import Todo from '@/models/todo';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

// solved the issue while deploying on vercel
type Param = {
  params: Promise<{
    userid: string;
  }>;
};

export async function GET(request: NextRequest, context:Param) {
  try {
    await dbConnect();
    const userProvider = await context.params;
    const userid = userProvider.userid;

    const userTodos = await Todo.find({ userName: userid });

    if (!userTodos)
      return NextResponse.json('No Todos to be found', { status: 404 });

    return NextResponse.json(userTodos, { status: 200 });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, context:Param) {
  try {
    await dbConnect();
    const userProvider = await context.params;
    const userid = userProvider.userid;

    const { title, description } = await request.json();

    const newTodo = new Todo({
      userName: userid,
      TodoTitle: title,
      TodoDescription: description,
      completed: false,
    });

    await newTodo.save();

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context:Param) {
  try {
    await dbConnect();
    const userProvider = await context.params;
    const userid = userProvider.userid;
    const { id, title, description, completed } = await request.json();

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!updatedTodo)
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });

    return NextResponse.json({ status: 201 });
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
    const userProvider = await context.params;
    const userid = userProvider.userid;
    const { id } = await request.json();
    const userTodos = await Todo.findByIdAndDelete({ _id: id });

    if (!userTodos) return NextResponse.json('No such todo!', { status: 404 });

    return NextResponse.json(userTodos, { status: 200 });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to Delete todos' },
      { status: 500 }
    );
  }
}
